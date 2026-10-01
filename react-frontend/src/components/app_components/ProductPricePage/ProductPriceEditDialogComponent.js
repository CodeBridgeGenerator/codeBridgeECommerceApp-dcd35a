/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Editor } from 'primereact/editor';


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

const ProductPriceEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            basePrice: _entity?.basePrice,
discountPrice: _entity?.discountPrice,
taxPercentage: _entity?.taxPercentage,
        };

        setLoading(true);
        try {
            
        const result = await client.service("productPrice").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info productPrice updated successfully" });
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
        <Dialog header="Edit Product Price" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="productPrice-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="basePrice">Base Price:</label>
                <InputNumber tooltip="Use only numbers" id="basePrice" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.basePrice} onValueChange={(e) => setValByKey("basePrice", e.value)} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["basePrice"]) && (
              <p className="m-0" key="error-basePrice">
                {error["basePrice"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountPrice">Discount Price:</label>
                <InputNumber tooltip="Use only numbers" id="discountPrice" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.discountPrice} onValueChange={(e) => setValByKey("discountPrice", e.value)} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountPrice"]) && (
              <p className="m-0" key="error-discountPrice">
                {error["discountPrice"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="taxPercentage">Tax Percentage:</label>
                    <Editor id="taxPercentage" value={_entity?.taxPercentage} onTextChange={(e) => setValByKey("taxPercentage", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["taxPercentage"]) && (
                  <p className="m-0" key="error-taxPercentage">
                    {error["taxPercentage"]}
                  </p>
                ) }
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

export default connect(mapState, mapDispatch)(ProductPriceEditDialogComponent);
