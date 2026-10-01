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
const statusOptions = [
    {
        "name": "Available",
        "value": "Available"
    },
    {
        "name": "Not Available",
        "value": "Not Available"
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

const ProductsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [categoryName, setCategoryName] = useState([])
const [variantName, setVariantName] = useState([])
const [productSize, setProductSize] = useState([])
const [productStock, setProductStock] = useState([])
const [productColour, setProductColour] = useState([])
const [sku, setSku] = useState([])
const [price, setPrice] = useState([])
const [afterDiscount, setAfterDiscount] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount category
                    client
                        .service("category")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCategoryId } })
                        .then((res) => {
                            setCategoryName(res.data.map((e) => { return { name: e['categoryName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Category", type: "error", message: error.message || "Failed get category" });
                        });
                }, []);
 useEffect(() => {
                    //on mount inventory
                    client
                        .service("inventory")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleInventoryId } })
                        .then((res) => {
                            setVariantName(res.data.map((e) => { return { name: e['variant'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Inventory", type: "error", message: error.message || "Failed get inventory" });
                        });
                }, []);
useEffect(() => {
                                    // on mount productSize
                                    client
                                        .service("productSize")
                                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProductSizeId } })
                                        .then((res) => {
                                            setProductSize(res.data.map((e) => { return { sizeValue: `${e["sizeValue"]}`,sizeCategory: `${e["sizeCategory"]}`, value: e._id }}));
                                        })
                                        .catch((error) => {
                                            console.debug({ error });
                                            props.alert({ title: "ProductSize", type: "error", message: error.message || "Failed get productSize" });
                                        });
                                }, []);
 useEffect(() => {
                    //on mount productColour
                    client
                        .service("productColour")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProductColourId } })
                        .then((res) => {
                            setProductColour(res.data.map((e) => { return { name: e['colorName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "ProductColour", type: "error", message: error.message || "Failed get productColour" });
                        });
                }, []);
 useEffect(() => {
                    //on mount productPrice
                    client
                        .service("productPrice")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProductPriceId } })
                        .then((res) => {
                            setPrice(res.data.map((e) => { return { name: e['basePrice'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "ProductPrice", type: "error", message: error.message || "Failed get productPrice" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            productName: _entity?.productName,
productSize: _entity?.productSize?._id,
afterDiscount: _entity?.afterDiscount?._id,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        await client.service("products").patch(_entity._id, _data);
        const eagerResult = await client
            .service("products")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "categoryName",
                    service : "category",
                    select:["categoryName"]},{
                    path : "variantName",
                    service : "inventory",
                    select:["variant"]},{
                    path : "productSize",
                    service : "productSize",
                    select:["sizeValue","sizeCategory"]},{
                    path : "productColour",
                    service : "productColour",
                    select:["colorName"]},{
                    path : "price",
                    service : "productPrice",
                    select:["basePrice"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info products updated successfully" });
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

    const categoryNameOptions = categoryName.map((elem) => ({ name: elem.name, value: elem.value }));
const variantNameOptions = variantName.map((elem) => ({ name: elem.name, value: elem.value }));
const productSizeOptions = productSize.map((elem) => ({ name: elem.name, value: elem.value }));
const productStockOptions = productStock.map((elem) => ({ name: elem.name, value: elem.value }));
const productColourOptions = productColour.map((elem) => ({ name: elem.name, value: elem.value }));
const skuOptions = sku.map((elem) => ({ name: elem.name, value: elem.value }));
const priceOptions = price.map((elem) => ({ name: elem.name, value: elem.value }));
const afterDiscountOptions = afterDiscount.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Products" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="products-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productName">Product Name:</label>
                <InputText id="productName" className="w-full mb-3 p-inputtext-sm" value={_entity?.productName} onChange={(e) => setValByKey("productName", e.target.value)}  />
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
                <label htmlFor="categoryName">Category Name:</label>
                <MultiSelect id="categoryName" value={_entity?.categoryName?.map((i) =>i._id)} options={categoryNameOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("categoryName", e.value)}  />
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
                <label htmlFor="variantName">Variant Name:</label>
                <MultiSelect id="variantName" value={_entity?.variantName?.map((i) =>i._id)} options={variantNameOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("variantName", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["variantName"]) && (
              <p className="m-0" key="error-variantName">
                {error["variantName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productSize">Product Size:</label>
                <Dropdown id="productSize" value={_entity?.productSize?._id} optionLabel="name" optionValue="value" options={productSizeOptions} onChange={(e) => setValByKey("productSize", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productSize"]) && (
              <p className="m-0" key="error-productSize">
                {error["productSize"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productStock">Product Stock:</label>
                <MultiSelect id="productStock" value={_entity?.productStock?.map((i) =>i._id)} options={productStockOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("productStock", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productStock"]) && (
              <p className="m-0" key="error-productStock">
                {error["productStock"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productColour">Product Colour:</label>
                <MultiSelect id="productColour" value={_entity?.productColour?.map((i) =>i._id)} options={productColourOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("productColour", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productColour"]) && (
              <p className="m-0" key="error-productColour">
                {error["productColour"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sku">SKU:</label>
                <MultiSelect id="sku" value={_entity?.sku?.map((i) =>i._id)} options={skuOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("sku", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sku"]) && (
              <p className="m-0" key="error-sku">
                {error["sku"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="price">Price:</label>
                <MultiSelect id="price" value={_entity?.price?.map((i) =>i._id)} options={priceOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("price", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["price"]) && (
              <p className="m-0" key="error-price">
                {error["price"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="afterDiscount">After Discount:</label>
                <Dropdown id="afterDiscount" value={_entity?.afterDiscount?._id} optionLabel="name" optionValue="value" options={afterDiscountOptions} onChange={(e) => setValByKey("afterDiscount", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["afterDiscount"]) && (
              <p className="m-0" key="error-afterDiscount">
                {error["afterDiscount"]}
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

export default connect(mapState, mapDispatch)(ProductsEditDialogComponent);
