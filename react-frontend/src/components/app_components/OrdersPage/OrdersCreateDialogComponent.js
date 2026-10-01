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
const statusOptions = [
    {
        "name": "Completed",
        "value": "Completed"
    },
    {
        "name": "Delivered",
        "value": "Delivered"
    },
    {
        "name": "Processing",
        "value": "Processing"
    },
    {
        "name": "Failed",
        "value": "Failed"
    }
];

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

const OrdersCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [customerName, setCustomerName] = useState([])
const [couponName, setCouponName] = useState([])
const [subtotal, setSubtotal] = useState([])
const [discount, setDiscount] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [customerName,couponName,subtotal,discount], setError);
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
            orderNumber: _entity?.orderNumber,customerName: _entity?.customerName?._id,paymentNumber: _entity?.paymentNumber,couponName: _entity?.couponName?.map((e) => e.value),subtotal: _entity?.subtotal?.map((e) => e.value),discount: _entity?.discount?.map((e) => e.value),status: _entity?.status,placedOrderDate: _entity?.placedOrderDate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("orders").create(_data);
        const eagerResult = await client
            .service("orders")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "customerName",
                    service : "customer",
                    select:["customerName"]},{
                    path : "couponName",
                    service : "coupons",
                    select:["couponName"]},{
                    path : "subtotal",
                    service : "products",
                    select:["price"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Orders updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Orders" });
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
                    // on mount coupons
                    client
                        .service("coupons")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCouponsId } })
                        .then((res) => {
                            setCouponName(res.data.map((e) => { return { name: e['couponName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Coupons", type: "error", message: error.message || "Failed get coupons" });
                        });
                }, []);

useEffect(() => {
                    // on mount products
                    client
                        .service("products")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProductsId } })
                        .then((res) => {
                            setSubtotal(res.data.map((e) => { return { name: e['price'], value: e._id }}));
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
const couponNameOptions = couponName.map((elem) => ({ name: elem, value: elem }));
const subtotalOptions = subtotal.map((elem) => ({ name: elem, value: elem }));
const discountOptions = discount.map((elem) => ({ name: elem, value: elem }));

    return (
        <Dialog header="Create Orders" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="orders-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderNumber">Order Number:</label>
                <InputText id="orderNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.orderNumber} onChange={(e) => setValByKey("orderNumber", e.target.value)}  />
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
                <label htmlFor="paymentNumber">Payment Number:</label>
                <InputText id="paymentNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentNumber} onChange={(e) => setValByKey("paymentNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentNumber"]) ? (
              <p className="m-0" key="error-paymentNumber">
                {error["paymentNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="couponName">Coupon Name:</label>
                <MultiSelect id="couponName" value={_entity?.couponName} options={couponNameOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("couponName", e.value)}   itemTemplate={couponNameTemplate} panelFooterTemplate={couponNamePanelFooterTemplate} selectedItemTemplate={couponNameSelectedItemTemplate}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["couponName"]) ? (
              <p className="m-0" key="error-couponName">
                {error["couponName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="subtotal">Subtotal:</label>
                <MultiSelect id="subtotal" value={_entity?.subtotal} options={subtotalOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("subtotal", e.value)}   itemTemplate={subtotalTemplate} panelFooterTemplate={subtotalPanelFooterTemplate} selectedItemTemplate={subtotalSelectedItemTemplate}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["subtotal"]) ? (
              <p className="m-0" key="error-subtotal">
                {error["subtotal"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discount">Discount:</label>
                <MultiSelect id="discount" value={_entity?.discount} options={discountOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("discount", e.value)}   itemTemplate={discountTemplate} panelFooterTemplate={discountPanelFooterTemplate} selectedItemTemplate={discountSelectedItemTemplate}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discount"]) ? (
              <p className="m-0" key="error-discount">
                {error["discount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <Dropdown id="status" value={_entity?.status} options={statusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("status", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="placedOrderDate">Placed Order Date:</label>
                <Calendar id="placedOrderDate"  value={_entity?.placedOrderDate ? new Date(_entity?.placedOrderDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("placedOrderDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["placedOrderDate"]) ? (
              <p className="m-0" key="error-placedOrderDate">
                {error["placedOrderDate"]}
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

export default connect(mapState, mapDispatch)(OrdersCreateDialogComponent);
