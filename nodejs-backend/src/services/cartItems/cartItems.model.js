
    module.exports = function (app) {
        const modelName = "cart_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            cartItem: { type: [Schema.Types.ObjectId], ref: "cart", description: "isArray", comment: "Cart Item, multiselect, false, true, true, true, true, true, true, cart, cart, one-to-many, customerName," },
variantName: { type: [Schema.Types.ObjectId], ref: "inventory", description: "isArray", comment: "Variant Name, multiselect, false, true, true, true, true, true, true, inventory, inventory, one-to-many, variantName," },
quantity: { type: Number, max: 1000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
addedAt: { type: Date, comment: "Added At, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };