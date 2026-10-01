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

const OrderHistoryCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [customerName, setCustomerName] = useState([])
const [productName, setProductName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [customerName,productName], setError);
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
            customerName: _entity?.customerName?._id,productName: _entity?.productName?.map((e) => e.value),purchaseDate: _entity?.purchaseDate,paymentMethod: _entity?.paymentMethod,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("orderHistory").create(_data);
        const eagerResult = await client
            .service("orderHistory")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "customerName",
                    service : "customer",
                    select:["customerName"]},{
                    path : "productName",
                    service : "products",
                    select:["productName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Order History updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Order History" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount customer
                    client
                        .service("customer")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCustomerId } })
                        .then((res) => {
                            setCustomerName(res.data.map((e) => { return { name: e['customerName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Customer", type: "error", message: error.message || "Failed get customer" });
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

    const customerNameOptions = customerName.map((elem) => ({ name: elem.name, value: elem.value }));
const productNameOptions = productName.map((elem) => ({ name: elem, value: elem }));

    return (
        <Dialog header="Create Order History" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="orderHistory-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerName">Customer Name:</label>
                <Dropdown id="customerName" value={_entity?.customerName?._id} optionLabel="name" optionValue="value" options={customerNameOptions} onChange={(e) => setValByKey("customerName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerName"]) ? (
              <p className="m-0" key="error-customerName">
                {error["customerName"]}
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
                <label htmlFor="purchaseDate">Purchase Date:</label>
                <Calendar id="purchaseDate"  value={_entity?.purchaseDate ? new Date(_entity?.purchaseDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("purchaseDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseDate"]) ? (
              <p className="m-0" key="error-purchaseDate">
                {error["purchaseDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentMethod">Payment Method:</label>
                <InputText id="paymentMethod" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentMethod} onChange={(e) => setValByKey("paymentMethod", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentMethod"]) ? (
              <p className="m-0" key="error-paymentMethod">
                {error["paymentMethod"]}
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

export default connect(mapState, mapDispatch)(OrderHistoryCreateDialogComponent);
