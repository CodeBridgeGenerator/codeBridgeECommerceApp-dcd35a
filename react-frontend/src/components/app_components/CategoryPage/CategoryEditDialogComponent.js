/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Editor } from 'primereact/editor';
import UploadFilesToS3 from "../../../services/UploadFilesToS3";
import { Dropdown } from 'primereact/dropdown';
const showInMenuOptions = [
    {
        "name": "Yes",
        "value": "Yes"
    },
    {
        "name": "No",
        "value": "No"
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

const CategoryEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [productName, setProductName] = useState([])
const [typeOfProduct, setTypeOfProduct] = useState([])
const [productsTotal, setProductsTotal] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount products
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
useEffect(() => {
                                    // on mount typeOfProduct
                                    client
                                        .service("typeOfProduct")
                                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleTypeOfProductId } })
                                        .then((res) => {
                                            setTypeOfProduct(res.data.map((e) => { return { productType: `${e["productType"]}`,productName: `${e["productName"]}`, value: e._id }}));
                                        })
                                        .catch((error) => {
                                            console.debug({ error });
                                            props.alert({ title: "TypeOfProduct", type: "error", message: error.message || "Failed get typeOfProduct" });
                                        });
                                }, []);

    const onSave = async () => {
        let _data = {
            categoryName: _entity?.categoryName,
description: _entity?.description,
image: _entity?.image,
showInMenu: _entity?.showInMenu,
productsTotal: _entity?.productsTotal?._id,
        };

        setLoading(true);
        try {
            
        await client.service("category").patch(_entity._id, _data);
        const eagerResult = await client
            .service("category")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "productName",
                    service : "products",
                    select:["productName"]},{
                    path : "typeOfProduct",
                    service : "typeOfProduct",
                    select:["productType","productName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info category updated successfully" });
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
const typeOfProductOptions = typeOfProduct.map((elem) => ({ name: elem.name, value: elem.value }));
const productsTotalOptions = productsTotal.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Category" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="category-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="categoryName">Category Name:</label>
                <InputTextarea id="categoryName" rows={5} cols={30} value={_entity?.categoryName} onChange={ (e) => setValByKey("categoryName", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["categoryName"]) && (
              <p className="m-0" key="error-categoryName">
                {error["categoryName"]}
              </p>
            )}
          </small>
            </div>
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
                <label htmlFor="typeOfProduct">Type Of Product:</label>
                <MultiSelect id="typeOfProduct" value={_entity?.typeOfProduct?.map((i) =>i._id)} options={typeOfProductOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("typeOfProduct", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["typeOfProduct"]) && (
              <p className="m-0" key="error-typeOfProduct">
                {error["typeOfProduct"]}
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
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="image">Image:</label>
                    <UploadFilesToS3 type={'edit'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleCategoryId} serviceName="category" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["image"]) && (
                  <p className="m-0" key="error-image">
                    {error["image"]}
                  </p>
                )}
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="showInMenu">Show In Menu:</label>
                <Dropdown id="showInMenu" value={_entity?.showInMenu} options={showInMenuOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("showInMenu", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["showInMenu"]) && (
              <p className="m-0" key="error-showInMenu">
                {error["showInMenu"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productsTotal">Products Total:</label>
                <Dropdown id="productsTotal" value={_entity?.productsTotal?._id} optionLabel="name" optionValue="value" options={productsTotalOptions} onChange={(e) => setValByKey("productsTotal", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productsTotal"]) && (
              <p className="m-0" key="error-productsTotal">
                {error["productsTotal"]}
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

export default connect(mapState, mapDispatch)(CategoryEditDialogComponent);
