
    module.exports = function (app) {
        const modelName = "order";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            orderNumber: { type:  String , comment: "Order Number, p, false, true, true, true, true, true, true, , , , ," },
customerName: { type: Schema.Types.ObjectId, ref: "customer", comment: "Customer Name, dropdown, false, true, true, true, true, true, true, customer, customer, one-to-one, customerName," },
emailContact: { type: Schema.Types.ObjectId, ref: "customer", comment: "Email Contact, dropdown, false, true, true, true, true, true, true, customer, customer, one-to-one, email," },
phoneContact: { type: Schema.Types.ObjectId, ref: "customer", comment: "Phone Contact, dropdown, false, true, true, true, true, true, true, customer, customer, one-to-one, phoneNumber," },
, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
subtotal: { type: Number, max: 1000000, comment: "Subtotal, currency, false, true, true, true, true, true, true, , , , ," },
coupon: { type: Schema.Types.ObjectId, ref: "coupons", comment: "Coupon, dropdown, false, true, true, true, true, true, true, coupons, coupons, one-to-one, coupon," },
discount: { type: Schema.Types.ObjectId, ref: "product_price", comment: "Discount, dropdown, false, true, true, true, true, true, true, productPrice, product_price, one-to-one, discountPrice," },
shippingFee: { type: Number, max: 1000000, comment: "Shipping Fee, currency, false, true, true, true, true, true, true, , , , ," },
placedOrderDate: { type: Date, comment: "Placed Order Date, p_date, false, true, true, true, true, true, true, , , , ," },
tax: { type: Number, max: 1000000, comment: "Tax, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };