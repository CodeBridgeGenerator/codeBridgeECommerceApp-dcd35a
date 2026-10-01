
    module.exports = function (app) {
        const modelName = "order_history";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerName: { type: Schema.Types.ObjectId, ref: "customer", comment: "Customer Name, dropdown, false, true, true, true, true, true, true, customer, customer, one-to-one, customerName," },
productName: { type: [Schema.Types.ObjectId], ref: "products", description: "isArray", comment: "Product Name, multiselect, false, true, true, true, true, true, true, products, products, one-to-many, productName," },
purchaseDate: { type: Date, comment: "Purchase Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , comment: "Payment Method, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };