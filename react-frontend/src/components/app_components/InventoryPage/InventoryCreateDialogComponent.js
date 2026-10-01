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
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
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

const InventoryCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
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
            variantName: _entity?.variantName,sku: _entity?.sku,stockType: _entity?.stockType,stockQuantity: _entity?.stockQuantity,reservedQuantity: _entity?.reservedQuantity,availableQuantity: _entity?.availableQuantity,status: _entity?.status,updatedAt: _entity?.updatedAt,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("inventory").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Inventory created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Inventory" });
        }
        setLoading(false);
    };

    

    

    

    
    
    

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

    

    return (
        <Dialog header="Create Inventory" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="inventory-create-dialog-component">
            <div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="variantName">Variant Name:</label>
                    <Editor id="variantName" value={_entity?.variantName} onTextChange={(e) => setValByKey("variantName", e.htmlValue)} style={{ height: '320px' }} />
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
                <label htmlFor="sku">SKU:</label>
                <InputTextarea id="sku" rows={5} cols={30} value={_entity?.sku} onChange={ (e) => setValByKey("sku", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sku"]) ? (
              <p className="m-0" key="error-sku">
                {error["sku"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stockType">Stock Type:</label>
                <InputText id="stockType" className="w-full mb-3 p-inputtext-sm" value={_entity?.stockType} onChange={(e) => setValByKey("stockType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stockType"]) ? (
              <p className="m-0" key="error-stockType">
                {error["stockType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stockQuantity">Stock Quantity:</label>
                <InputNumber tooltip="Use only numbers" id="stockQuantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.stockQuantity} onChange={(e) => setValByKey("stockQuantity", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stockQuantity"]) ? (
              <p className="m-0" key="error-stockQuantity">
                {error["stockQuantity"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="reservedQuantity">Reserved Quantity:</label>
                <InputNumber tooltip="Use only numbers" id="reservedQuantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.reservedQuantity} onChange={(e) => setValByKey("reservedQuantity", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reservedQuantity"]) ? (
              <p className="m-0" key="error-reservedQuantity">
                {error["reservedQuantity"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="availableQuantity">Available Quantity:</label>
                <InputNumber tooltip="Use only numbers" id="availableQuantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.availableQuantity} onChange={(e) => setValByKey("availableQuantity", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["availableQuantity"]) ? (
              <p className="m-0" key="error-availableQuantity">
                {error["availableQuantity"]}
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
                <label htmlFor="updatedAt">Updated At:</label>
                <Calendar id="updatedAt"  value={_entity?.updatedAt ? new Date(_entity?.updatedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("updatedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["updatedAt"]) ? (
              <p className="m-0" key="error-updatedAt">
                {error["updatedAt"]}
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

export default connect(mapState, mapDispatch)(InventoryCreateDialogComponent);
