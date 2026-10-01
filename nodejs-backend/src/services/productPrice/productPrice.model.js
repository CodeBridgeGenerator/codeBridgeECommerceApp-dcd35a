
    module.exports = function (app) {
        const modelName = "product_price";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            basePrice: { type: Number, comment: "Base Price, currency, false, true, true, true, true, true, true, , , , ," },
discountPrice: { type: Number, max: 1000000, comment: "Discount Price, currency, false, true, true, true, true, true, true, , , , ," },
taxPercentage: { type:  String , maxLength: 150, index: true, trim: true, comment: "Tax Percentage, editor, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };