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
import { Calendar } from "primereact/calendar";
const statusOptions = [];

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

const PaymentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [orderNumber, setOrderNumber] = useState([])
const [amount, setAmount] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [orderNumber,amount], setError);
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
            paymentNumber: _entity?.paymentNumber,orderNumber: _entity?.orderNumber?._id,paymentMethod: _entity?.paymentMethod,amount: _entity?.amount?._id,status: _entity?.status,paidAt: _entity?.paidAt,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("payments").create(_data);
        const eagerResult = await client
            .service("payments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "orderNumber",
                    service : "order",
                    select:["orderNumber"]},{
                    path : "amount",
                    service : "checkout",
                    select:["subtotal"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Payments updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Payments" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount order
                    client
                        .service("order")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleOrderId } })
                        .then((res) => {
                            setOrderNumber(res.data.map((e) => { return { name: e['orderNumber'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Order", type: "error", message: error.message || "Failed get order" });
                        });
                }, []);

useEffect(() => {
                    // on mount checkout
                    client
                        .service("checkout")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCheckoutId } })
                        .then((res) => {
                            setAmount(res.data.map((e) => { return { name: e['subtotal'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Checkout", type: "error", message: error.message || "Failed get checkout" });
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

    const orderNumberOptions = orderNumber.map((elem) => ({ name: elem, value: elem }));
const amountOptions = amount.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Payments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="payments-create-dialog-component">
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="amount">Amount:</label>
                <Dropdown id="amount" value={_entity?.amount?._id} optionLabel="name" optionValue="value" options={amountOptions} onChange={(e) => setValByKey("amount", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["amount"]) ? (
              <p className="m-0" key="error-amount">
                {error["amount"]}
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
                <label htmlFor="paidAt">Paid At:</label>
                <Calendar id="paidAt"  value={_entity?.paidAt ? new Date(_entity?.paidAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("paidAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paidAt"]) ? (
              <p className="m-0" key="error-paidAt">
                {error["paidAt"]}
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

export default connect(mapState, mapDispatch)(PaymentsCreateDialogComponent);
