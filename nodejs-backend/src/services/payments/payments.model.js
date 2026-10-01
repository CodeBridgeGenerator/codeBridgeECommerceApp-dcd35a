
    module.exports = function (app) {
        const modelName = "payments";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            paymentNumber: { type:  String , comment: "Payment Number, p, false, true, true, true, true, true, true, , , , ," },
orderNumber: { type: [Schema.Types.ObjectId], ref: "order", description: "isArray", comment: "Order Number, dropdown, false, true, true, true, true, true, true, order, order, one-to-one, orderNumber," },
paymentMethod: { type:  String , comment: "Payment Method, p, false, true, true, true, true, true, true, , , , ," },
amount: { type: Schema.Types.ObjectId, ref: "checkout", comment: "Amount, dropdown, false, true, true, true, true, true, true, checkout, checkout, one-to-one, subtotal," },
, comment: "Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },
paidAt: { type: Date, comment: "Paid At, p_calendar, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };