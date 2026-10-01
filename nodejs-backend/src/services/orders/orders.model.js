
    module.exports = function (app) {
        const modelName = "orders";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            orderNumber: { type:  String , maxLength: 150, index: true, trim: true, comment: "Order Number, p, false, true, true, true, true, true, true, , , , ," },
customerName: { type: Schema.Types.ObjectId, ref: "customer", comment: "Customer Name, dropdown, false, true, true, true, true, true, true, customer, customer, one-to-one, customerName," },
paymentNumber: { type:  String , comment: "Payment Number, p, false, true, true, true, true, true, true, , , , ," },
couponName: { type: [Schema.Types.ObjectId], ref: "coupons", description: "isArray", comment: "Coupon Name, multiselect, false, true, true, true, true, true, true, coupons, coupons, one-to-many, couponName," },
subtotal: { type: [Schema.Types.ObjectId], ref: "products", description: "isArray", comment: "Subtotal, multiselect, false, true, true, true, true, true, true, products, products, one-to-many, price," },
discount: { type: [Schema.Types.ObjectId], ref: "products", description: "isArray", comment: "Discount, multiselect, false, true, true, true, true, true, true, products, products, one-to-many, afterDiscount," },
status: { type: String , enum: ["Completed","Delivered","Processing","Failed"], comment: "Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },
placedOrderDate: { type: Date, comment: "Placed Order Date, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };