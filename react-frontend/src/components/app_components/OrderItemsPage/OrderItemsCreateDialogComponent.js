import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";


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

const OrderItemsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [orderNumber, setOrderNumber] = useState([])
const [productName, setProductName] = useState([])
const [variantName, setVariantName] = useState([])
const [quantity, setQuantity] = useState([])
const [unitPrice, setUnitPrice] = useState([])
const [netTotal, setNetTotal] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [orderNumber,productName,variantName,quantity,unitPrice,netTotal], setError);
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
            orderNumber: _entity?.orderNumber?._id,productName: _entity?.productName?.map((e) => e.value),variantName: _entity?.variantName?.map((e) => e.value),quantity: _entity?.quantity?.map((e) => e.value),unitPrice: _entity?.unitPrice?._id,netTotal: _entity?.netTotal?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("orderItems").create(_data);
        const eagerResult = await client
            .service("orderItems")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "orderNumber",
                    service : "orders",
                    select:["orderNumber"]},{
                    path : "productName",
                    service : "products",
                    select:["productName"]},{
                    path : "variantName",
                    service : "inventory",
                    select:["variantName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Order Items updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Order Items" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount orders
                    client
                        .service("orders")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleOrdersId } })
                        .then((res) => {
                            setOrderNumber(res.data.map((e) => { return { name: e['orderNumber'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Orders", type: "error", message: error.message || "Failed get orders" });
                        });
                }, []);

useEffect(() => {
                    // on mount products
                    client
                        .service("products")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProductsId } })
                        .then((res) => {
                            setProductName(res.data.map((e) => { return { name: e['productName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Products", type: "error", message: error.message || "Failed get products" });
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

    const orderNumberOptions = orderNumber.map((elem) => ({ name: elem.name, value: elem.value }));
const productNameOptions = productName.map((elem) => ({ name: elem, value: elem }));
const variantNameOptions = variantName.map((elem) => ({ name: elem, value: elem }));
const quantityOptions = quantity.map((elem) => ({ name: elem, value: elem }));
const unitPriceOptions = unitPrice.map((elem) => ({ name: elem.name, value: elem.value }));
const netTotalOptions = netTotal.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Order Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="orderItems-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderNumber">Order Number:</label>
                <Dropdown id="orderNumber" value={_entity?.orderNumber?._id} optionLabel="name" optionValue="value" options={orderNumberOptions} onChange={(e) => setValByKey("orderNumber", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderNumber"]) ? (
              <p className="m-0" key="error-orderNumber">
                {error["orderNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productName">Product Name:</label>
                <MultiSelect id="productName" value={_entity?.productName} options={productNameOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("productName", e.value)}   itemTemplate={productNameTemplate} panelFooterTemplate={productNamePanelFooterTemplate} selectedItemTemplate={productNameSelectedItemTemplate}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productName"]) ? (
              <p className="m-0" key="error-productName">
                {error["productName"]}
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
                <MultiSelect id="quantity" value={_entity?.quantity} options={quantityOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("quantity", e.value)}   itemTemplate={quantityTemplate} panelFooterTemplate={quantityPanelFooterTemplate} selectedItemTemplate={quantitySelectedItemTemplate}  />
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
                <label htmlFor="unitPrice">Unit Price:</label>
                <Dropdown id="unitPrice" value={_entity?.unitPrice?._id} optionLabel="name" optionValue="value" options={unitPriceOptions} onChange={(e) => setValByKey("unitPrice", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitPrice"]) ? (
              <p className="m-0" key="error-unitPrice">
                {error["unitPrice"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="netTotal">Net Total:</label>
                <Dropdown id="netTotal" value={_entity?.netTotal?._id} optionLabel="name" optionValue="value" options={netTotalOptions} onChange={(e) => setValByKey("netTotal", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["netTotal"]) ? (
              <p className="m-0" key="error-netTotal">
                {error["netTotal"]}
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

export default connect(mapState, mapDispatch)(OrderItemsCreateDialogComponent);
