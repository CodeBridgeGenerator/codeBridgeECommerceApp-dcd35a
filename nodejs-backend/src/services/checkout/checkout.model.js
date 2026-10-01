
    module.exports = function (app) {
        const modelName = "checkout";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            orderNumber: { type: [Schema.Types.ObjectId], ref: "order", description: "isArray", comment: "Order Number, multiselect, false, true, true, true, true, true, true, order, order, one-to-many, orderNumber," },
customerName: { type: [Schema.Types.ObjectId], ref: "order", description: "isArray", comment: "Customer Name, multiselect, false, true, true, true, true, true, true, order, order, one-to-many, customerName," },
, comment: "Payment Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , comment: "Payment Method, p, false, true, true, true, true, true, true, , , , ," },
subtotal: { type: Schema.Types.ObjectId, ref: "order_product", comment: "Subtotal, dropdown, false, true, true, true, true, true, true, orderProduct, order_product, one-to-one, netTotal," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };