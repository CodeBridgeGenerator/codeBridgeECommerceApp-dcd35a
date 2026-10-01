import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const CartItemsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [cartItem, setCartItem] = useState([])
const [variantName, setVariantName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [cartItem,variantName], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            cartItem: _entity?.cartItem?.map((e) => e.value),variantName: _entity?.variantName?.map((e) => e.value),quantity: _entity?.quantity,addedAt: _entity?.addedAt,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("cartItems").create(_data);
        const eagerResult = await client
            .service("cartItems")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "cartItem",
                    service : "cart",
                    select:["customerName"]},{
                    path : "variantName",
                    service : "inventory",
                    select:["variantName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Cart Items updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Cart Items" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount cart
                    client
                        .service("cart")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCartId } })
                        .then((res) => {
                            setCartItem(res.data.map((e) => { return { name: e['customerName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Cart", type: "error", message: error.message || "Failed get cart" });
                        });
                }, []);

useEffect(() => {
                    // on mount inventory
                    client
                        .service("inventory")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleInventoryId } })
                        .then((res) => {
                            setVariantName(res.data.map((e) => { return { name: e['variantName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Inventory", type: "error", message: error.message || "Failed get inventory" });
                        });
                }, []);

    
    
    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const cartItemOptions = cartItem.map((elem) => ({ name: elem, value: elem }));
const variantNameOptions = variantName.map((elem) => ({ name: elem, value: elem }));

    return (
        <Dialog header="Create Cart Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="cartItems-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cartItem">Cart Item:</label>
                <MultiSelect id="cartItem" value={_entity?.cartItem} options={cartItemOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("cartItem", e.value)}   itemTemplate={cartItemTemplate} panelFooterTemplate={cartItemPanelFooterTemplate} selectedItemTemplate={cartItemSelectedItemTemplate}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cartItem"]) ? (
              <p className="m-0" key="error-cartItem">
                {error["cartItem"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="variantName">Variant Name:</label>
                <MultiSelect id="variantName" value={_entity?.variantName} options={variantNameOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("variantName", e.value)}   itemTemplate={variantNameTemplate} panelFooterTemplate={variantNamePanelFooterTemplate} selectedItemTemplate={variantNameSelectedItemTemplate}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["variantName"]) ? (
              <p className="m-0" key="error-variantName">
                {error["variantName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quantity">Quantity:</label>
                <InputNumber tooltip="Use only numbers" id="quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantity"]) ? (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="addedAt">Added At:</label>
                <Calendar id="addedAt"  value={_entity?.addedAt ? new Date(_entity?.addedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("addedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["addedAt"]) ? (
              <p className="m-0" key="error-addedAt">
                {error["addedAt"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CartItemsCreateDialogComponent);
