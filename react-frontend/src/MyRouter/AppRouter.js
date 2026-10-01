import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleCategoryPage from "../components/app_components/CategoryPage/SingleCategoryPage";
import CategoryProjectLayoutPage from "../components/app_components/CategoryPage/CategoryProjectLayoutPage";
import SingleProductsPage from "../components/app_components/ProductsPage/SingleProductsPage";
import ProductProjectLayoutPage from "../components/app_components/ProductsPage/ProductProjectLayoutPage";
import SingleProductSizePage from "../components/app_components/ProductSizePage/SingleProductSizePage";
import ProductSizeProjectLayoutPage from "../components/app_components/ProductSizePage/ProductSizeProjectLayoutPage";
import SingleProductPricePage from "../components/app_components/ProductPricePage/SingleProductPricePage";
import ProductPriceProjectLayoutPage from "../components/app_components/ProductPricePage/ProductPriceProjectLayoutPage";
import SingleProductColourPage from "../components/app_components/ProductColourPage/SingleProductColourPage";
import ProductColourProjectLayoutPage from "../components/app_components/ProductColourPage/ProductColourProjectLayoutPage";
import SingleInventoryPage from "../components/app_components/InventoryPage/SingleInventoryPage";
import InventoryProjectLayoutPage from "../components/app_components/InventoryPage/InventoryProjectLayoutPage";
import SingleCartPage from "../components/app_components/CartPage/SingleCartPage";
import CartProjectLayoutPage from "../components/app_components/CartPage/CartProjectLayoutPage";
import SingleCartItemsPage from "../components/app_components/CartItemsPage/SingleCartItemsPage";
import CartItemProjectLayoutPage from "../components/app_components/CartItemsPage/CartItemProjectLayoutPage";
import SingleCheckoutPage from "../components/app_components/CheckoutPage/SingleCheckoutPage";
import CheckoutProjectLayoutPage from "../components/app_components/CheckoutPage/CheckoutProjectLayoutPage";
import SingleOrderPage from "../components/app_components/OrderPage/SingleOrderPage";
import OrderProjectLayoutPage from "../components/app_components/OrderPage/OrderProjectLayoutPage";
import SingleOrderProductPage from "../components/app_components/OrderProductPage/SingleOrderProductPage";
import OrderProductProjectLayoutPage from "../components/app_components/OrderProductPage/OrderProductProjectLayoutPage";
import SingleOrderHistoryPage from "../components/app_components/OrderHistoryPage/SingleOrderHistoryPage";
import OrderHistoryProjectLayoutPage from "../components/app_components/OrderHistoryPage/OrderHistoryProjectLayoutPage";
import SingleCouponsPage from "../components/app_components/CouponsPage/SingleCouponsPage";
import CouponProjectLayoutPage from "../components/app_components/CouponsPage/CouponProjectLayoutPage";
import SinglePaymentsPage from "../components/app_components/PaymentsPage/SinglePaymentsPage";
import PaymentProjectLayoutPage from "../components/app_components/PaymentsPage/PaymentProjectLayoutPage";
import SingleReturnsRefundsPage from "../components/app_components/ReturnsRefundsPage/SingleReturnsRefundsPage";
import ReturnsRefundProjectLayoutPage from "../components/app_components/ReturnsRefundsPage/ReturnsRefundProjectLayoutPage";
import SingleCustomerPage from "../components/app_components/CustomerPage/SingleCustomerPage";
import CustomerProjectLayoutPage from "../components/app_components/CustomerPage/CustomerProjectLayoutPage";
import SingleCustomerAddressPage from "../components/app_components/CustomerAddressPage/SingleCustomerAddressPage";
import CustomerAddressProjectLayoutPage from "../components/app_components/CustomerAddressPage/CustomerAddressProjectLayoutPage";
import SingleReviewsPage from "../components/app_components/ReviewsPage/SingleReviewsPage";
import ReviewProjectLayoutPage from "../components/app_components/ReviewsPage/ReviewProjectLayoutPage";
import SingleTypeOfProductPage from "../components/app_components/TypeOfProductPage/SingleTypeOfProductPage";
import TypeOfProductProjectLayoutPage from "../components/app_components/TypeOfProductPage/TypeOfProductProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/category/:singleCategoryId" exact element={<SingleCategoryPage />} />
<Route path="/category" exact element={<CategoryProjectLayoutPage />} />
<Route path="/products/:singleProductsId" exact element={<SingleProductsPage />} />
<Route path="/products" exact element={<ProductProjectLayoutPage />} />
<Route path="/productSize/:singleProductSizeId" exact element={<SingleProductSizePage />} />
<Route path="/productSize" exact element={<ProductSizeProjectLayoutPage />} />
<Route path="/productPrice/:singleProductPriceId" exact element={<SingleProductPricePage />} />
<Route path="/productPrice" exact element={<ProductPriceProjectLayoutPage />} />
<Route path="/productColour/:singleProductColourId" exact element={<SingleProductColourPage />} />
<Route path="/productColour" exact element={<ProductColourProjectLayoutPage />} />
<Route path="/inventory/:singleInventoryId" exact element={<SingleInventoryPage />} />
<Route path="/inventory" exact element={<InventoryProjectLayoutPage />} />
<Route path="/cart/:singleCartId" exact element={<SingleCartPage />} />
<Route path="/cart" exact element={<CartProjectLayoutPage />} />
<Route path="/cartItems/:singleCartItemsId" exact element={<SingleCartItemsPage />} />
<Route path="/cartItems" exact element={<CartItemProjectLayoutPage />} />
<Route path="/checkout/:singleCheckoutId" exact element={<SingleCheckoutPage />} />
<Route path="/checkout" exact element={<CheckoutProjectLayoutPage />} />
<Route path="/order/:singleOrderId" exact element={<SingleOrderPage />} />
<Route path="/order" exact element={<OrderProjectLayoutPage />} />
<Route path="/orderProduct/:singleOrderProductId" exact element={<SingleOrderProductPage />} />
<Route path="/orderProduct" exact element={<OrderProductProjectLayoutPage />} />
<Route path="/orderHistory/:singleOrderHistoryId" exact element={<SingleOrderHistoryPage />} />
<Route path="/orderHistory" exact element={<OrderHistoryProjectLayoutPage />} />
<Route path="/coupons/:singleCouponsId" exact element={<SingleCouponsPage />} />
<Route path="/coupons" exact element={<CouponProjectLayoutPage />} />
<Route path="/payments/:singlePaymentsId" exact element={<SinglePaymentsPage />} />
<Route path="/payments" exact element={<PaymentProjectLayoutPage />} />
<Route path="/returnsRefunds/:singleReturnsRefundsId" exact element={<SingleReturnsRefundsPage />} />
<Route path="/returnsRefunds" exact element={<ReturnsRefundProjectLayoutPage />} />
<Route path="/customer/:singleCustomerId" exact element={<SingleCustomerPage />} />
<Route path="/customer" exact element={<CustomerProjectLayoutPage />} />
<Route path="/customerAddress/:singleCustomerAddressId" exact element={<SingleCustomerAddressPage />} />
<Route path="/customerAddress" exact element={<CustomerAddressProjectLayoutPage />} />
<Route path="/reviews/:singleReviewsId" exact element={<SingleReviewsPage />} />
<Route path="/reviews" exact element={<ReviewProjectLayoutPage />} />
<Route path="/typeOfProduct/:singleTypeOfProductId" exact element={<SingleTypeOfProductPage />} />
<Route path="/typeOfProduct" exact element={<TypeOfProductProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
