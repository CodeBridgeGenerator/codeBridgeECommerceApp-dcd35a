
    module.exports = function (app) {
        const modelName = "products";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            productName: { type:  String , comment: "Product Name, p, false, true, true, true, true, true, true, , , , ," },
categoryName: { type: [Schema.Types.ObjectId], ref: "category", description: "isArray", comment: "Category Name, multiselect, false, true, true, true, true, true, true, category, category, one-to-many, categoryName," },
variantName: { type: [Schema.Types.ObjectId], ref: "inventory", description: "isArray", comment: "Variant Name, multiselect, false, true, true, true, true, true, true, inventory, inventory, one-to-many, variant," },
productSize: { type: Schema.Types.ObjectId, comment: "Product Size, dropdown, false, true, true, true, true, true, true, productSize, product_size, , sizeValue:sizeCategory," },
productStock: { type: [Schema.Types.ObjectId], ref: "inventory", description: "isArray", comment: "Product Stock, multiselect, false, true, true, true, true, true, true, inventory, inventory, one-to-many, availableQuantity," },
productColour: { type: [Schema.Types.ObjectId], ref: "product_colour", description: "isArray", comment: "Product Colour, multiselect, false, true, true, true, true, true, true, productColour, product_colour, one-to-many, colorName," },
sku: { type: [Schema.Types.ObjectId], ref: "inventory", description: "isArray", comment: "SKU, multiselect, false, true, true, true, true, true, true, inventory, inventory, one-to-many, sku," },
price: { type: [Schema.Types.ObjectId], ref: "product_price", description: "isArray", comment: "Price, multiselect, false, true, true, true, true, true, true, productPrice, product_price, one-to-many, basePrice," },
afterDiscount: { type: Schema.Types.ObjectId, comment: "After Discount, dropdown, false, true, true, true, true, true, true, productPrice, product_price, , discountPrice," },
status: { type: String , enum: ["Available","Not Available"], comment: "Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };