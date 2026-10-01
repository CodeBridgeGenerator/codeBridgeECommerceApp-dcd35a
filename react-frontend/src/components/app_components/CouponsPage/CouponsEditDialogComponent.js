/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const CouponsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            couponName: _entity?.couponName,
couponCode: _entity?.couponCode,
typeOfCoupon: _entity?.typeOfCoupon,
minimumOrder: _entity?.minimumOrder,
validUntil: _entity?.validUntil,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        const result = await client.service("coupons").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info coupons updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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
        <Dialog header="Edit Coupons" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="coupons-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="couponName">Coupon Name:</label>
                <InputText id="couponName" className="w-full mb-3 p-inputtext-sm" value={_entity?.couponName} onChange={(e) => setValByKey("couponName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["couponName"]) && (
              <p className="m-0" key="error-couponName">
                {error["couponName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="couponCode">Coupon Code:</label>
                <InputText id="couponCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.couponCode} onChange={(e) => setValByKey("couponCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["couponCode"]) && (
              <p className="m-0" key="error-couponCode">
                {error["couponCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="typeOfCoupon">Type of Coupon:</label>
                <InputText id="typeOfCoupon" className="w-full mb-3 p-inputtext-sm" value={_entity?.typeOfCoupon} onChange={(e) => setValByKey("typeOfCoupon", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["typeOfCoupon"]) && (
              <p className="m-0" key="error-typeOfCoupon">
                {error["typeOfCoupon"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="minimumOrder">Minimum Order:</label>
                <InputText id="minimumOrder" className="w-full mb-3 p-inputtext-sm" value={_entity?.minimumOrder} onChange={(e) => setValByKey("minimumOrder", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["minimumOrder"]) && (
              <p className="m-0" key="error-minimumOrder">
                {error["minimumOrder"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="validUntil">Valid Until:</label>
                <Calendar id="validUntil" value={_entity?.validUntil ? new Date(_entity?.validUntil) : null} onChange={ (e) => setValByKey("validUntil", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["validUntil"]) && (
              <p className="m-0" key="error-validUntil">
                {error["validUntil"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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

export default connect(mapState, mapDispatch)(CouponsEditDialogComponent);
