
    module.exports = function (app) {
        const modelName = "cart";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerName: { type: [Schema.Types.ObjectId], ref: "customer", description: "isArray", comment: "Customer Name, dropdown, false, true, true, true, true, true, true, customer, customer, one-to-one, customerName," },
couponCode: { type: [Schema.Types.ObjectId], ref: "coupons", description: "isArray", comment: "Coupon Code, multiselect, false, true, true, true, true, true, true, coupons, coupons, one-to-many, couponCode," },
, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
updatedAt: { type: Date, comment: "Updated At, p_calendar, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };