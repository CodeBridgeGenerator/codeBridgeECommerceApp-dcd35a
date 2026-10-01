import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import CategoryPage from "../CategoryPage/CategoryPage";
import OrderProductPage from "../OrderProductPage/OrderProductPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";

const SingleProductsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [categoryName, setCategoryName] = useState([]);
const [variantName, setVariantName] = useState([]);
const [productSize, setProductSize] = useState([]);
const [productStock, setProductStock] = useState([]);
const [productColour, setProductColour] = useState([]);
const [sku, setSku] = useState([]);
const [price, setPrice] = useState([]);
const [afterDiscount, setAfterDiscount] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("products")
            .get(urlParams.singleProductsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"categoryName","variantName","productSize","productStock","productColour","sku","price","afterDiscount"] }})
            .then((res) => {
                set_entity(res || {});
                const categoryName = Array.isArray(res.categoryName)
            ? res.categoryName.map((elem) => ({ _id: elem._id, categoryName: elem.categoryName }))
            : res.categoryName
                ? [{ _id: res.categoryName._id, categoryName: res.categoryName.categoryName }]
                : [];
        setCategoryName(categoryName);
const variantName = Array.isArray(res.variantName)
            ? res.variantName.map((elem) => ({ _id: elem._id, variant: elem.variant }))
            : res.variantName
                ? [{ _id: res.variantName._id, variant: res.variantName.variant }]
                : [];
        setVariantName(variantName);
const productSize = Array.isArray(res.productSize)
            ? res.productSize.map((elem) => ({ _id: elem._id, sizeValue: elem.sizeValue }))
            : res.productSize
                ? [{ _id: res.productSize._id, sizeValue: res.productSize.sizeValue }]
                : [];
        setProductSize(productSize);
const productStock = Array.isArray(res.productStock)
            ? res.productStock.map((elem) => ({ _id: elem._id, availableQuantity: elem.availableQuantity }))
            : res.productStock
                ? [{ _id: res.productStock._id, availableQuantity: res.productStock.availableQuantity }]
                : [];
        setProductStock(productStock);
const productColour = Array.isArray(res.productColour)
            ? res.productColour.map((elem) => ({ _id: elem._id, colorName: elem.colorName }))
            : res.productColour
                ? [{ _id: res.productColour._id, colorName: res.productColour.colorName }]
                : [];
        setProductColour(productColour);
const sku = Array.isArray(res.sku)
            ? res.sku.map((elem) => ({ _id: elem._id, sku: elem.sku }))
            : res.sku
                ? [{ _id: res.sku._id, sku: res.sku.sku }]
                : [];
        setSku(sku);
const price = Array.isArray(res.price)
            ? res.price.map((elem) => ({ _id: elem._id, basePrice: elem.basePrice }))
            : res.price
                ? [{ _id: res.price._id, basePrice: res.price.basePrice }]
                : [];
        setPrice(price);
const afterDiscount = Array.isArray(res.afterDiscount)
            ? res.afterDiscount.map((elem) => ({ _id: elem._id, discountPrice: elem.discountPrice }))
            : res.afterDiscount
                ? [{ _id: res.afterDiscount._id, discountPrice: res.afterDiscount.discountPrice }]
                : [];
        setAfterDiscount(afterDiscount);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Products", type: "error", message: error.message || "Failed get products" });
            });
    }, [props,urlParams.singleProductsId]);


    const goBack = () => {
        navigate("/app/products");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Products</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>products/{urlParams.singleProductsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Product Name</label><p className="m-0 ml-3" >{_entity?.productName}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Category Name</label>
                    {categoryName.map((elem) => (
                        <Link key={elem._id} to={`/category/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.categoryName}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Variant Name</label>
                    {variantName.map((elem) => (
                        <Link key={elem._id} to={`/inventory/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.variant}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Product Size</label>
                    {productSize.map((elem) => (
                        <Link key={elem._id} to={`/productSize/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.sizeValue}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Product Stock</label>
                    {productStock.map((elem) => (
                        <Link key={elem._id} to={`/inventory/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.availableQuantity}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Product Colour</label>
                    {productColour.map((elem) => (
                        <Link key={elem._id} to={`/productColour/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.colorName}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">SKU</label>
                    {sku.map((elem) => (
                        <Link key={elem._id} to={`/inventory/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.sku}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Price</label>
                    {price.map((elem) => (
                        <Link key={elem._id} to={`/productPrice/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.basePrice}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">After Discount</label>
                    {afterDiscount.map((elem) => (
                        <Link key={elem._id} to={`/productPrice/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.discountPrice}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Category" leftIcon="pi pi-building-columns mr-2">
                        <CategoryPage/>
                    </TabPanel>
                    

                    <TabPanel header="Order Product" leftIcon="pi pi-building-columns mr-2">
                        <OrderProductPage/>
                    </TabPanel>
                    

                    <TabPanel header="Order History" leftIcon="pi pi-building-columns mr-2">
                        <OrderHistoryPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleProductsId}
        user={props.user}
        alert={props.alert}
        serviceName="products"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleProductsPage);
