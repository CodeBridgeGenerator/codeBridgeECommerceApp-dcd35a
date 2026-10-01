const category = require("./category/category.service.js");
const products = require("./products/products.service.js");
const productSize = require("./productSize/productSize.service.js");
const productPrice = require("./productPrice/productPrice.service.js");
const productColour = require("./productColour/productColour.service.js");
const inventory = require("./inventory/inventory.service.js");
const cart = require("./cart/cart.service.js");
const cartItems = require("./cartItems/cartItems.service.js");
const checkout = require("./checkout/checkout.service.js");
const order = require("./order/order.service.js");
const orderProduct = require("./orderProduct/orderProduct.service.js");
const orderHistory = require("./orderHistory/orderHistory.service.js");
const coupons = require("./coupons/coupons.service.js");
const payments = require("./payments/payments.service.js");
const returnsRefunds = require("./returnsRefunds/returnsRefunds.service.js");
const customer = require("./customer/customer.service.js");
const customerAddress = require("./customerAddress/customerAddress.service.js");
const reviews = require("./reviews/reviews.service.js");
const typeOfProduct = require("./typeOfProduct/typeOfProduct.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(category);
  app.configure(products);
  app.configure(productSize);
  app.configure(productPrice);
  app.configure(productColour);
  app.configure(inventory);
  app.configure(cart);
  app.configure(cartItems);
  app.configure(checkout);
  app.configure(order);
  app.configure(orderProduct);
  app.configure(orderHistory);
  app.configure(coupons);
  app.configure(payments);
  app.configure(returnsRefunds);
  app.configure(customer);
  app.configure(customerAddress);
  app.configure(reviews);
  app.configure(typeOfProduct);
    // ~cb-add-configure-service-name~
};
