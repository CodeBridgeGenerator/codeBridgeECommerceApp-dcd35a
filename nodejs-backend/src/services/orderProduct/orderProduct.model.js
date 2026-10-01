
    module.exports = function (app) {
        const modelName = "order_product";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            orderNumber: { type: [Schema.Types.ObjectId], ref: "order", description: "isArray", comment: "Order Number, multiselect, false, true, true, true, true, true, true, order, order, one-to-many, orderNumber," },
customerName: { type: Schema.Types.ObjectId, ref: "customer", comment: "Customer Name, dropdown, false, true, true, true, true, true, true, customer, customer, one-to-one, customerName," },
productName: { type: [Schema.Types.ObjectId], ref: "products", description: "isArray", comment: "Product Name, multiselect, false, true, true, true, true, true, true, products, products, one-to-many, productName," },
variantName: { type: [Schema.Types.ObjectId], ref: "inventory", description: "isArray", comment: "Variant Name, multiselect, false, true, true, true, true, true, true, inventory, inventory, one-to-many, variantName," },
sku: { type: [Schema.Types.ObjectId], ref: "inventory", description: "isArray", comment: "SKU, multiselect, false, true, true, true, true, true, true, inventory, inventory, one-to-many, sku," },
quantity: { type:  String , maxLength: 150, index: true, trim: true, comment: "Quantity, p, false, true, true, true, true, true, true, , , , ," },
productType: { type: [Schema.Types.ObjectId], ref: "type_of_product", description: "isArray", comment: "Product Type, multiselect, false, true, true, true, true, true, true, typeOfProduct, type_of_product, one-to-many, productType," },
unitPrice: { type: Schema.Types.ObjectId, ref: "product_price", comment: "Unit Price, dropdown, false, true, true, true, true, true, true, productPrice, product_price, one-to-one, basePrice," },
netTotal: { type: [Schema.Types.ObjectId], ref: "checkout", description: "isArray", comment: "Net Total, multiselect, false, true, true, true, true, true, true, checkout, checkout, one-to-many, subtotal," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };