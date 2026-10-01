import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Editor } from 'primereact/editor';
import UploadFilesToS3 from "../../../services/UploadFilesToS3";
import { Dropdown } from "primereact/dropdown";
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
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const CategoryCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [productName, setProductName] = useState([])
const [typeOfProduct, setTypeOfProduct] = useState([])
const [productsTotal, setProductsTotal] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [productName,typeOfProduct,productsTotal], setError);
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
            categoryName: _entity?.categoryName,productName: _entity?.productName?.map((e) => e.value),typeOfProduct: _entity?.typeOfProduct?.map((e) => e.value),description: _entity?.description,image: _entity?.image,showInMenu: _entity?.showInMenu,productsTotal: _entity?.productsTotal?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("category").create(_data);
        const eagerResult = await client
            .service("category")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "productName",
                    service : "products",
                    select:["productName"]},{
                    path : "typeOfProduct",
                    service : "typeOfProduct",
                    select:["productType","productName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Category updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Category" });
        }
        setLoading(false);
    };

    const onFileimageLoaded = (file, status) => {
    if (status)
      props.alert({
        title: "file uploader",
        type: "success",
        message: "file uploaded" + file.name
      });
    else
      props.alert({
        title: "file uploader",
        type: "error",
        message: "file uploader failed" + file.name
      });
  };

    const setimageId = (id) => { setValByKey("image", id);  };

    useEffect(() => {
                    // on mount products
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

    const productNameOptions = productName.map((elem) => ({ name: elem, value: elem }));
const typeOfProductOptions = typeOfProduct.map((elem) => ({ name: elem, value: elem }));
const productsTotalOptions = productsTotal.map((elem) => ({ name: elem, value: elem }));

    return (
        <Dialog header="Create Category" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="category-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="categoryName">Category Name:</label>
                <InputTextarea id="categoryName" rows={5} cols={30} value={_entity?.categoryName} onChange={ (e) => setValByKey("categoryName", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["categoryName"]) ? (
              <p className="m-0" key="error-categoryName">
                {error["categoryName"]}
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
                <label htmlFor="typeOfProduct">Type Of Product:</label>
                <MultiSelect id="typeOfProduct" value={_entity?.typeOfProduct} options={typeOfProductOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("typeOfProduct", e.value)}   itemTemplate={typeOfProductTemplate} panelFooterTemplate={typeOfProductPanelFooterTemplate} selectedItemTemplate={typeOfProductSelectedItemTemplate}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["typeOfProduct"]) ? (
              <p className="m-0" key="error-typeOfProduct">
                {error["typeOfProduct"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="description">Description:</label>
                    <Editor id="description" value={_entity?.description} onTextChange={(e) => setValByKey("description", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["description"]) ? (
                  <p className="m-0" key="error-description">
                    {error["description"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 field">
                    <span className="align-items-center">
                        <label htmlFor="image">Image:</label>
                        <UploadFilesToS3 type={'create'} user={props.user} id={urlParams.id} serviceName="category" onUploadComplete={setimageId} onFileLoaded={onFileimageLoaded}/>
                    </span>
                    <small className="p-error">
                    {!_.isEmpty(error["image"]) ? (
                      <p className="m-0" key="error-image">
                        {error["image"]}
                      </p>
                    ) : null}
                  </small>
                    </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="showInMenu">Show In Menu:</label>
                <Dropdown id="showInMenu" value={_entity?.showInMenu} options={showInMenuOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("showInMenu", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["showInMenu"]) ? (
              <p className="m-0" key="error-showInMenu">
                {error["showInMenu"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productsTotal">Products Total:</label>
                <Dropdown id="productsTotal" value={_entity?.productsTotal?._id} optionLabel="name" optionValue="value" options={productsTotalOptions} onChange={(e) => setValByKey("productsTotal", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productsTotal"]) ? (
              <p className="m-0" key="error-productsTotal">
                {error["productsTotal"]}
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

export default connect(mapState, mapDispatch)(CategoryCreateDialogComponent);
