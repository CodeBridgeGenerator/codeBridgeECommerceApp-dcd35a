import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Editor } from 'primereact/editor';
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
const requestTypeOptions = [
    {
        "name": "Return",
        "value": "Return"
    },
    {
        "name": "Cancellation",
        "value": "Cancellation"
    },
    {
        "name": "Exchange",
        "value": "Exchange"
    }
];
const conditonOptions = [
    {
        "name": "Resellable",
        "value": "Resellable"
    },
    {
        "name": "Damaged",
        "value": "Damaged"
    },
    {
        "name": "Defective",
        "value": "Defective"
    },
    {
        "name": "Return only",
        "value": "Return only"
    }
];
const statusOptions = [
    {
        "name": "Requested",
        "value": "Requested"
    },
    {
        "name": "Approved",
        "value": "Approved"
    },
    {
        "name": "Rejected",
        "value": "Rejected"
    },
    {
        "name": "Received",
        "value": "Received"
    },
    {
        "name": "Refunded",
        "value": "Refunded"
    }
];
const refundMethodOptions = [
    {
        "name": "Original payment",
        "value": "Original payment"
    },
    {
        "name": "Store credit",
        "value": "Store credit"
    },
    {
        "name": "Replacement",
        "value": "Replacement"
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

const ReturnsRefundsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [orderNumber, setOrderNumber] = useState([])
const [productName, setProductName] = useState([])
const [customerName, setCustomerName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [orderNumber,productName,customerName], setError);
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
            requestNumber: _entity?.requestNumber,requestType: _entity?.requestType,orderNumber: _entity?.orderNumber?.map((e) => e.value),productName: _entity?.productName?.map((e) => e.value),customerName: _entity?.customerName?._id,reason: _entity?.reason,productDetail: _entity?.productDetail,photos: _entity?.photos,conditon: _entity?.conditon,status: _entity?.status,refundMethod: _entity?.refundMethod,refundAmount: _entity?.refundAmount,refundRef: _entity?.refundRef,dateReturn: _entity?.dateReturn,requestedAt: _entity?.requestedAt,refundedAt: _entity?.refundedAt,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("returnsRefunds").create(_data);
        const eagerResult = await client
            .service("returnsRefunds")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "orderNumber",
                    service : "orderProduct",
                    select:["orderNumber"]},{
                    path : "customerName",
                    service : "customer",
                    select:["customerName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Returns Refunds updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Returns Refunds" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount orderProduct
                    client
                        .service("orderProduct")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleOrderProductId } })
                        .then((res) => {
                            setOrderNumber(res.data.map((e) => { return { name: e['orderNumber'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "OrderProduct", type: "error", message: error.message || "Failed get orderProduct" });
                        });
                }, []);

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
const productNameOptions = productName.map((elem) => ({ name: elem, value: elem }));
const customerNameOptions = customerName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Returns Refunds" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="returnsRefunds-create-dialog-component">
            <div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="requestNumber">Request Number:</label>
                    <Editor id="requestNumber" value={_entity?.requestNumber} onTextChange={(e) => setValByKey("requestNumber", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["requestNumber"]) ? (
                  <p className="m-0" key="error-requestNumber">
                    {error["requestNumber"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="requestType">Request Type:</label>
                <Dropdown id="requestType" value={_entity?.requestType} options={requestTypeOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("requestType", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["requestType"]) ? (
              <p className="m-0" key="error-requestType">
                {error["requestType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderNumber">Order Number:</label>
                <MultiSelect id="orderNumber" value={_entity?.orderNumber} options={orderNumberOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("orderNumber", e.value)}   itemTemplate={orderNumberTemplate} panelFooterTemplate={orderNumberPanelFooterTemplate} selectedItemTemplate={orderNumberSelectedItemTemplate}  />
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
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="reason">Reason:</label>
                    <Editor id="reason" value={_entity?.reason} onTextChange={(e) => setValByKey("reason", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["reason"]) ? (
                  <p className="m-0" key="error-reason">
                    {error["reason"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productDetail">Product Detail:</label>
                <InputTextarea id="productDetail" rows={5} cols={30} value={_entity?.productDetail} onChange={ (e) => setValByKey("productDetail", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productDetail"]) ? (
              <p className="m-0" key="error-productDetail">
                {error["productDetail"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="photos">Photos:</label>
                <InputText className="w-full mb-3 p-inputtext-sm" value={_entity?.photos} onChange={(e) => setValByKey("photos", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["photos"]) ? (
              <p className="m-0" key="error-photos">
                {error["photos"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="conditon">Conditon:</label>
                <Dropdown id="conditon" value={_entity?.conditon} options={conditonOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("conditon", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["conditon"]) ? (
              <p className="m-0" key="error-conditon">
                {error["conditon"]}
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
                <label htmlFor="refundMethod">Refund Method:</label>
                <Dropdown id="refundMethod" value={_entity?.refundMethod} options={refundMethodOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("refundMethod", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refundMethod"]) ? (
              <p className="m-0" key="error-refundMethod">
                {error["refundMethod"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refundAmount">Refund Amount:</label>
                <InputNumber tooltip="Use only numbers" id="refundAmount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.refundAmount} onValueChange={(e) => setValByKey("refundAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refundAmount"]) ? (
              <p className="m-0" key="error-refundAmount">
                {error["refundAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="refundRef">Refund Ref:</label>
                    <Editor id="refundRef" value={_entity?.refundRef} onTextChange={(e) => setValByKey("refundRef", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["refundRef"]) ? (
                  <p className="m-0" key="error-refundRef">
                    {error["refundRef"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateReturn">Date Return:</label>
                <Calendar id="dateReturn"  value={_entity?.dateReturn ? new Date(_entity?.dateReturn) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dateReturn", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateReturn"]) ? (
              <p className="m-0" key="error-dateReturn">
                {error["dateReturn"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="requestedAt">Requested At:</label>
                <Calendar id="requestedAt"  value={_entity?.requestedAt ? new Date(_entity?.requestedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("requestedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["requestedAt"]) ? (
              <p className="m-0" key="error-requestedAt">
                {error["requestedAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refundedAt">Refunded At:</label>
                <Calendar id="refundedAt"  value={_entity?.refundedAt ? new Date(_entity?.refundedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("refundedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refundedAt"]) ? (
              <p className="m-0" key="error-refundedAt">
                {error["refundedAt"]}
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

export default connect(mapState, mapDispatch)(ReturnsRefundsCreateDialogComponent);
