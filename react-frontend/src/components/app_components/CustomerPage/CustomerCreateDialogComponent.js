import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
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

const CustomerCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [address, setAddress] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [address], setError);
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
            customerName: _entity?.customerName,email: _entity?.email,phoneNumber: _entity?.phoneNumber,address: _entity?.address?.map((e) => e.value),joinedAt: _entity?.joinedAt,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("customer").create(_data);
        const eagerResult = await client
            .service("customer")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "address",
                    service : "customerAddress",
                    select:["addressType","addressLine1","addressLine2","city","postalCode","country"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Customer updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Customer" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount customerAddress
                    client
                        .service("customerAddress")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCustomerAddressId } })
                        .then((res) => {
                            setAddress(res.data.map((e) => { return { addressType: `${e["addressType"]}`,addressLine1: `${e["addressLine1"]}`,addressLine2: `${e["addressLine2"]}`,city: `${e["city"]}`,postalCode: `${e["postalCode"]}`,country: `${e["country"]}`, value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "CustomerAddress", type: "error", message: error.message || "Failed get customerAddress" });
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

    const addressOptions = address.map((elem) => ({ name: elem, value: elem }));

    return (
        <Dialog header="Create Customer" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="customer-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerName">Customer Name:</label>
                <InputText id="customerName" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerName} onChange={(e) => setValByKey("customerName", e.target.value)}  />
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
                <label htmlFor="email">Email:</label>
                <InputText id="email" className="w-full mb-3 p-inputtext-sm" value={_entity?.email} onChange={(e) => setValByKey("email", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["email"]) ? (
              <p className="m-0" key="error-email">
                {error["email"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <InputNumber tooltip="Use only numbers" id="phoneNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.phoneNumber} onChange={(e) => setValByKey("phoneNumber", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phoneNumber"]) ? (
              <p className="m-0" key="error-phoneNumber">
                {error["phoneNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="address">Address:</label>
                <MultiSelect id="address" value={_entity?.address} options={addressOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("address", e.value)}   itemTemplate={addressTemplate} panelFooterTemplate={addressPanelFooterTemplate} selectedItemTemplate={addressSelectedItemTemplate}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address"]) ? (
              <p className="m-0" key="error-address">
                {error["address"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="joinedAt">Joined At:</label>
                <Calendar id="joinedAt"  value={_entity?.joinedAt ? new Date(_entity?.joinedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("joinedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["joinedAt"]) ? (
              <p className="m-0" key="error-joinedAt">
                {error["joinedAt"]}
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

export default connect(mapState, mapDispatch)(CustomerCreateDialogComponent);
