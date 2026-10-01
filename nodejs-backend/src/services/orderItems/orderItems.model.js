
    module.exports = function (app) {
        const modelName = "order_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            orderNumber: { type: Schema.Types.ObjectId, ref: "orders", comment: "Order Number, dropdown, false, true, true, true, true, true, true, orders, orders, one-to-one, orderNumber," },
productName: { type: [Schema.Types.ObjectId], ref: "products", description: "isArray", comment: "Product Name, multiselect, false, true, true, true, true, true, true, products, products, one-to-many, productName," },
variantName: { type: [Schema.Types.ObjectId], ref: "inventory", description: "isArray", comment: "Variant Name, multiselect, false, true, true, true, true, true, true, inventory, inventory, one-to-many, variantName," },
quantity: { type: [Schema.Types.ObjectId], ref: "inventory", description: "isArray", comment: "Quantity, multiselect, false, true, true, true, true, true, true, inventory, inventory, one-to-many, stockQuantity," },
unitPrice: { type: Schema.Types.ObjectId, ref: "products", comment: "Unit Price, dropdown, false, true, true, true, true, true, true, products, products, one-to-one, price," },
netTotal: { type: Schema.Types.ObjectId, ref: "products", comment: "Net Total, dropdown, false, true, true, true, true, true, true, products, products, one-to-one, afterDiscount," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };