
    module.exports = function (app) {
        const modelName = "reviews";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            productName: { type: [Schema.Types.ObjectId], ref: "order_product", description: "isArray", comment: "Product Name, multiselect, false, true, true, true, true, true, true, orderProduct, order_product, one-to-many, productName," },
customerName: { type: [Schema.Types.ObjectId], ref: "customer", description: "isArray", comment: "Customer Name, dropdown, false, true, true, true, true, true, true, customer, customer, one-to-one, customerName," },
rating: { type: Number, comment: "Rating, rating, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , comment: "Description, editor, false, true, true, true, true, true, true, , , , ," },
isVerified: { type: Boolean, required: false, comment: "Is Verified, tick, false, true, true, true, true, true, true, , , , ," },
status: { type: String , enum: ["Reviewed","Not Reviewed"], comment: "Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };