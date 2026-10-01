/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Editor } from 'primereact/editor';
import { Checkbox } from 'primereact/checkbox';
const statusOptions = [
    {
        "name": "Reviewed",
        "value": "Reviewed"
    },
    {
        "name": "Not Reviewed",
        "value": "Not Reviewed"
    }
];

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

const ReviewsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [productName, setProductName] = useState([])
const [customerName, setCustomerName] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount orderProduct
                    client
                        .service("orderProduct")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleOrderProductId } })
                        .then((res) => {
                            setProductName(res.data.map((e) => { return { name: e['productName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "OrderProduct", type: "error", message: error.message || "Failed get orderProduct" });
                        });
                }, []);
 useEffect(() => {
                    //on mount customer
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

    const onSave = async () => {
        let _data = {
            customerName: _entity?.customerName?._id,
rating: _entity?.rating,
description: _entity?.description,
isVerified: _entity?.isVerified,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        await client.service("reviews").patch(_entity._id, _data);
        const eagerResult = await client
            .service("reviews")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "productName",
                    service : "orderProduct",
                    select:["productName"]},{
                    path : "customerName",
                    service : "customer",
                    select:["customerName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info reviews updated successfully" });
        props.onEditResult(eagerResult.data[0]);
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

    const productNameOptions = productName.map((elem) => ({ name: elem.name, value: elem.value }));
const customerNameOptions = customerName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Reviews" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="reviews-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productName">Product Name:</label>
                <MultiSelect id="productName" value={_entity?.productName?.map((i) =>i._id)} options={productNameOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("productName", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productName"]) && (
              <p className="m-0" key="error-productName">
                {error["productName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerName">Customer Name:</label>
                <Dropdown id="customerName" value={_entity?.customerName?._id} optionLabel="name" optionValue="value" options={customerNameOptions} onChange={(e) => setValByKey("customerName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerName"]) && (
              <p className="m-0" key="error-customerName">
                {error["customerName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rating">Rating:</label>
                <InputNumber tooltip="Use only numbers" id="rating" min={1} max={5} style={{width:"20rem"}} value={_entity?.rating} onChange={ (e) => setValByKey("rating", e.value)} cancel={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rating"]) && (
              <p className="m-0" key="error-rating">
                {error["rating"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="description">Description:</label>
                    <Editor id="description" value={_entity?.description} onTextChange={(e) => setValByKey("description", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["description"]) && (
                  <p className="m-0" key="error-description">
                    {error["description"]}
                  </p>
                ) }
              </small>
                </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isVerified">Is Verified:</label>
                <Checkbox id="isVerified" className="ml-3" checked={_entity?.isVerified} onChange={(e) => setValByKey("isVerified", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isVerified"]) && (
              <p className="m-0" key="error-isVerified">
                {error["isVerified"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <Dropdown id="status" value={_entity?.status} options={statusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("status", e.value)}  />
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

export default connect(mapState, mapDispatch)(ReviewsEditDialogComponent);
