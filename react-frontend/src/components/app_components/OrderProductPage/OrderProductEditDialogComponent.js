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

const OrderProductEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [orderNumber, setOrderNumber] = useState([])
const [customerName, setCustomerName] = useState([])
const [productName, setProductName] = useState([])
const [variantName, setVariantName] = useState([])
const [sku, setSku] = useState([])
const [productType, setProductType] = useState([])
const [unitPrice, setUnitPrice] = useState([])
const [netTotal, setNetTotal] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount order
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
                    //on mount inventory
                    client
                        .service("inventory")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleInventoryId } })
                        .then((res) => {
                            setVariantName(res.data.map((e) => { return { name: e['variantName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Inventory", type: "error", message: error.message || "Failed get inventory" });
                        });
                }, []);
 useEffect(() => {
                    //on mount typeOfProduct
                    client
                        .service("typeOfProduct")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleTypeOfProductId } })
                        .then((res) => {
                            setProductType(res.data.map((e) => { return { name: e['productType'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "TypeOfProduct", type: "error", message: error.message || "Failed get typeOfProduct" });
                        });
                }, []);
 useEffect(() => {
                    //on mount productPrice
                    client
                        .service("productPrice")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProductPriceId } })
                        .then((res) => {
                            setUnitPrice(res.data.map((e) => { return { name: e['basePrice'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "ProductPrice", type: "error", message: error.message || "Failed get productPrice" });
                        });
                }, []);
 useEffect(() => {
                    //on mount checkout
                    client
                        .service("checkout")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCheckoutId } })
                        .then((res) => {
                            setNetTotal(res.data.map((e) => { return { name: e['subtotal'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Checkout", type: "error", message: error.message || "Failed get checkout" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            customerName: _entity?.customerName?._id,
quantity: _entity?.quantity,
unitPrice: _entity?.unitPrice?._id,
        };

        setLoading(true);
        try {
            
        await client.service("orderProduct").patch(_entity._id, _data);
        const eagerResult = await client
            .service("orderProduct")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "orderNumber",
                    service : "order",
                    select:["orderNumber"]},{
                    path : "customerName",
                    service : "customer",
                    select:["customerName"]},{
                    path : "productName",
                    service : "products",
                    select:["productName"]},{
                    path : "variantName",
                    service : "inventory",
                    select:["variantName"]},{
                    path : "productType",
                    service : "typeOfProduct",
                    select:["productType"]},{
                    path : "unitPrice",
                    service : "productPrice",
                    select:["basePrice"]},{
                    path : "netTotal",
                    service : "checkout",
                    select:["subtotal"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info orderProduct updated successfully" });
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

    const orderNumberOptions = orderNumber.map((elem) => ({ name: elem.name, value: elem.value }));
const customerNameOptions = customerName.map((elem) => ({ name: elem.name, value: elem.value }));
const productNameOptions = productName.map((elem) => ({ name: elem.name, value: elem.value }));
const variantNameOptions = variantName.map((elem) => ({ name: elem.name, value: elem.value }));
const skuOptions = sku.map((elem) => ({ name: elem.name, value: elem.value }));
const productTypeOptions = productType.map((elem) => ({ name: elem.name, value: elem.value }));
const unitPriceOptions = unitPrice.map((elem) => ({ name: elem.name, value: elem.value }));
const netTotalOptions = netTotal.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Order Product" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="orderProduct-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderNumber">Order Number:</label>
                <MultiSelect id="orderNumber" value={_entity?.orderNumber?.map((i) =>i._id)} options={orderNumberOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("orderNumber", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderNumber"]) && (
              <p className="m-0" key="error-orderNumber">
                {error["orderNumber"]}
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
                <label htmlFor="quantity">Quantity:</label>
                <InputText id="quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantity"]) && (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productType">Product Type:</label>
                <MultiSelect id="productType" value={_entity?.productType?.map((i) =>i._id)} options={productTypeOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("productType", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productType"]) && (
              <p className="m-0" key="error-productType">
                {error["productType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unitPrice">Unit Price:</label>
                <Dropdown id="unitPrice" value={_entity?.unitPrice?._id} optionLabel="name" optionValue="value" options={unitPriceOptions} onChange={(e) => setValByKey("unitPrice", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitPrice"]) && (
              <p className="m-0" key="error-unitPrice">
                {error["unitPrice"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="netTotal">Net Total:</label>
                <MultiSelect id="netTotal" value={_entity?.netTotal?.map((i) =>i._id)} options={netTotalOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("netTotal", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["netTotal"]) && (
              <p className="m-0" key="error-netTotal">
                {error["netTotal"]}
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

export default connect(mapState, mapDispatch)(OrderProductEditDialogComponent);
