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

const OrderCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [customerName, setCustomerName] = useState([])
const [emailContact, setEmailContact] = useState([])
const [phoneContact, setPhoneContact] = useState([])
const [coupon, setCoupon] = useState([])
const [discount, setDiscount] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [customerName,emailContact,phoneContact,coupon,discount], setError);
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
            orderNumber: _entity?.orderNumber,customerName: _entity?.customerName?._id,emailContact: _entity?.emailContact?._id,phoneContact: _entity?.phoneContact?._id,status: _entity?.status,subtotal: _entity?.subtotal,coupon: _entity?.coupon?._id,discount: _entity?.discount?._id,shippingFee: _entity?.shippingFee,placedOrderDate: _entity?.placedOrderDate,tax: _entity?.tax,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("order").create(_data);
        const eagerResult = await client
            .service("order")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "customerName",
                    service : "customer",
                    select:["customerName"]},{
                    path : "coupon",
                    service : "coupons",
                    select:["coupon"]},{
                    path : "discount",
                    service : "productPrice",
                    select:["discountPrice"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Order updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Order" });
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
                            setCoupon(res.data.map((e) => { return { name: e['coupon'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Coupons", type: "error", message: error.message || "Failed get coupons" });
                        });
                }, []);

useEffect(() => {
                    // on mount productPrice
                    client
                        .service("productPrice")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProductPriceId } })
                        .then((res) => {
                            setDiscount(res.data.map((e) => { return { name: e['discountPrice'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "ProductPrice", type: "error", message: error.message || "Failed get productPrice" });
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
const emailContactOptions = emailContact.map((elem) => ({ name: elem.name, value: elem.value }));
const phoneContactOptions = phoneContact.map((elem) => ({ name: elem.name, value: elem.value }));
const couponOptions = coupon.map((elem) => ({ name: elem.name, value: elem.value }));
const discountOptions = discount.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Order" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="order-create-dialog-component">
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
                <label htmlFor="emailContact">Email Contact:</label>
                <Dropdown id="emailContact" value={_entity?.emailContact?._id} optionLabel="name" optionValue="value" options={emailContactOptions} onChange={(e) => setValByKey("emailContact", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emailContact"]) ? (
              <p className="m-0" key="error-emailContact">
                {error["emailContact"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="phoneContact">Phone Contact:</label>
                <Dropdown id="phoneContact" value={_entity?.phoneContact?._id} optionLabel="name" optionValue="value" options={phoneContactOptions} onChange={(e) => setValByKey("phoneContact", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phoneContact"]) ? (
              <p className="m-0" key="error-phoneContact">
                {error["phoneContact"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
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
                <label htmlFor="subtotal">Subtotal:</label>
                <InputNumber tooltip="Use only numbers" id="subtotal" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.subtotal} onValueChange={(e) => setValByKey("subtotal", e.value)}  />
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
                <label htmlFor="coupon">Coupon:</label>
                <Dropdown id="coupon" value={_entity?.coupon?._id} optionLabel="name" optionValue="value" options={couponOptions} onChange={(e) => setValByKey("coupon", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["coupon"]) ? (
              <p className="m-0" key="error-coupon">
                {error["coupon"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discount">Discount:</label>
                <Dropdown id="discount" value={_entity?.discount?._id} optionLabel="name" optionValue="value" options={discountOptions} onChange={(e) => setValByKey("discount", {_id : e.value})}  />
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
                <label htmlFor="shippingFee">Shipping Fee:</label>
                <InputNumber tooltip="Use only numbers" id="shippingFee" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.shippingFee} onValueChange={(e) => setValByKey("shippingFee", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingFee"]) ? (
              <p className="m-0" key="error-shippingFee">
                {error["shippingFee"]}
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tax">Tax:</label>
                <InputNumber tooltip="Use only numbers" id="tax" className="w-full mb-3 p-inputtext-sm" value={_entity?.tax} onChange={(e) => setValByKey("tax", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tax"]) ? (
              <p className="m-0" key="error-tax">
                {error["tax"]}
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

export default connect(mapState, mapDispatch)(OrderCreateDialogComponent);
