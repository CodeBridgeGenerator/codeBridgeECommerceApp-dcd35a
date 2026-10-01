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

import CheckoutPage from "../CheckoutPage/CheckoutPage";
import ReturnsRefundsPage from "../ReturnsRefundsPage/ReturnsRefundsPage";
import ReviewsPage from "../ReviewsPage/ReviewsPage";

const SingleOrderProductPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [orderNumber, setOrderNumber] = useState([]);
const [customerName, setCustomerName] = useState([]);
const [productName, setProductName] = useState([]);
const [variantName, setVariantName] = useState([]);
const [sku, setSku] = useState([]);
const [productType, setProductType] = useState([]);
const [unitPrice, setUnitPrice] = useState([]);
const [netTotal, setNetTotal] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("orderProduct")
            .get(urlParams.singleOrderProductId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"orderNumber","customerName","productName","variantName","sku","productType","unitPrice","netTotal"] }})
            .then((res) => {
                set_entity(res || {});
                const orderNumber = Array.isArray(res.orderNumber)
            ? res.orderNumber.map((elem) => ({ _id: elem._id, orderNumber: elem.orderNumber }))
            : res.orderNumber
                ? [{ _id: res.orderNumber._id, orderNumber: res.orderNumber.orderNumber }]
                : [];
        setOrderNumber(orderNumber);
const customerName = Array.isArray(res.customerName)
            ? res.customerName.map((elem) => ({ _id: elem._id, customerName: elem.customerName }))
            : res.customerName
                ? [{ _id: res.customerName._id, customerName: res.customerName.customerName }]
                : [];
        setCustomerName(customerName);
const productName = Array.isArray(res.productName)
            ? res.productName.map((elem) => ({ _id: elem._id, productName: elem.productName }))
            : res.productName
                ? [{ _id: res.productName._id, productName: res.productName.productName }]
                : [];
        setProductName(productName);
const variantName = Array.isArray(res.variantName)
            ? res.variantName.map((elem) => ({ _id: elem._id, variantName: elem.variantName }))
            : res.variantName
                ? [{ _id: res.variantName._id, variantName: res.variantName.variantName }]
                : [];
        setVariantName(variantName);
const sku = Array.isArray(res.sku)
            ? res.sku.map((elem) => ({ _id: elem._id, sku: elem.sku }))
            : res.sku
                ? [{ _id: res.sku._id, sku: res.sku.sku }]
                : [];
        setSku(sku);
const productType = Array.isArray(res.productType)
            ? res.productType.map((elem) => ({ _id: elem._id, productType: elem.productType }))
            : res.productType
                ? [{ _id: res.productType._id, productType: res.productType.productType }]
                : [];
        setProductType(productType);
const unitPrice = Array.isArray(res.unitPrice)
            ? res.unitPrice.map((elem) => ({ _id: elem._id, basePrice: elem.basePrice }))
            : res.unitPrice
                ? [{ _id: res.unitPrice._id, basePrice: res.unitPrice.basePrice }]
                : [];
        setUnitPrice(unitPrice);
const netTotal = Array.isArray(res.netTotal)
            ? res.netTotal.map((elem) => ({ _id: elem._id, subtotal: elem.subtotal }))
            : res.netTotal
                ? [{ _id: res.netTotal._id, subtotal: res.netTotal.subtotal }]
                : [];
        setNetTotal(netTotal);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "OrderProduct", type: "error", message: error.message || "Failed get orderProduct" });
            });
    }, [props,urlParams.singleOrderProductId]);


    const goBack = () => {
        navigate("/app/orderProduct");
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
                    <h3 className="m-0">Order Product</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>orderProduct/{urlParams.singleOrderProductId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quantity</label><p className="m-0 ml-3" >{_entity?.quantity}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Order Number</label>
                    {orderNumber.map((elem) => (
                        <Link key={elem._id} to={`/order/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.orderNumber}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Customer Name</label>
                    {customerName.map((elem) => (
                        <Link key={elem._id} to={`/customer/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.customerName}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Product Name</label>
                    {productName.map((elem) => (
                        <Link key={elem._id} to={`/products/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.productName}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Variant Name</label>
                    {variantName.map((elem) => (
                        <Link key={elem._id} to={`/inventory/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.variantName}</p>
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
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Product Type</label>
                    {productType.map((elem) => (
                        <Link key={elem._id} to={`/typeOfProduct/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.productType}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Unit Price</label>
                    {unitPrice.map((elem) => (
                        <Link key={elem._id} to={`/productPrice/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.basePrice}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Net Total</label>
                    {netTotal.map((elem) => (
                        <Link key={elem._id} to={`/checkout/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.subtotal}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Checkout" leftIcon="pi pi-building-columns mr-2">
                        <CheckoutPage/>
                    </TabPanel>
                    

                    <TabPanel header="Returns Refunds" leftIcon="pi pi-building-columns mr-2">
                        <ReturnsRefundsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Reviews" leftIcon="pi pi-building-columns mr-2">
                        <ReviewsPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleOrderProductId}
        user={props.user}
        alert={props.alert}
        serviceName="orderProduct"
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

export default connect(mapState, mapDispatch)(SingleOrderProductPage);
