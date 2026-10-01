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


const SingleOrderItemsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [orderNumber, setOrderNumber] = useState([]);
const [productName, setProductName] = useState([]);
const [variantName, setVariantName] = useState([]);
const [quantity, setQuantity] = useState([]);
const [unitPrice, setUnitPrice] = useState([]);
const [netTotal, setNetTotal] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("orderItems")
            .get(urlParams.singleOrderItemsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"orderNumber","productName","variantName","quantity","unitPrice","netTotal"] }})
            .then((res) => {
                set_entity(res || {});
                const orderNumber = Array.isArray(res.orderNumber)
            ? res.orderNumber.map((elem) => ({ _id: elem._id, orderNumber: elem.orderNumber }))
            : res.orderNumber
                ? [{ _id: res.orderNumber._id, orderNumber: res.orderNumber.orderNumber }]
                : [];
        setOrderNumber(orderNumber);
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
const quantity = Array.isArray(res.quantity)
            ? res.quantity.map((elem) => ({ _id: elem._id, stockQuantity: elem.stockQuantity }))
            : res.quantity
                ? [{ _id: res.quantity._id, stockQuantity: res.quantity.stockQuantity }]
                : [];
        setQuantity(quantity);
const unitPrice = Array.isArray(res.unitPrice)
            ? res.unitPrice.map((elem) => ({ _id: elem._id, price: elem.price }))
            : res.unitPrice
                ? [{ _id: res.unitPrice._id, price: res.unitPrice.price }]
                : [];
        setUnitPrice(unitPrice);
const netTotal = Array.isArray(res.netTotal)
            ? res.netTotal.map((elem) => ({ _id: elem._id, afterDiscount: elem.afterDiscount }))
            : res.netTotal
                ? [{ _id: res.netTotal._id, afterDiscount: res.netTotal.afterDiscount }]
                : [];
        setNetTotal(netTotal);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "OrderItems", type: "error", message: error.message || "Failed get orderItems" });
            });
    }, [props,urlParams.singleOrderItemsId]);


    const goBack = () => {
        navigate("/app/orderItems");
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
                    <h3 className="m-0">Order Items</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>orderItems/{urlParams.singleOrderItemsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Order Number</label>
                    {orderNumber.map((elem) => (
                        <Link key={elem._id} to={`/orders/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.orderNumber}</p>
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
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quantity</label>
                    {quantity.map((elem) => (
                        <Link key={elem._id} to={`/inventory/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.stockQuantity}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Unit Price</label>
                    {unitPrice.map((elem) => (
                        <Link key={elem._id} to={`/products/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.price}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Net Total</label>
                    {netTotal.map((elem) => (
                        <Link key={elem._id} to={`/products/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.afterDiscount}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singleOrderItemsId}
        user={props.user}
        alert={props.alert}
        serviceName="orderItems"
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

export default connect(mapState, mapDispatch)(SingleOrderItemsPage);
