
    module.exports = function (app) {
        const modelName = "inventory";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            variantName: { type:  String , comment: "Variant Name, editor, false, true, true, true, true, true, true, , , , ," },
sku: { type:  String , comment: "SKU, inputTextarea, false, true, true, true, true, true, true, , , , ," },
stockType: { type:  String , comment: "Stock Type, p, false, true, true, true, true, true, true, , , , ," },
stockQuantity: { type: Number, comment: "Stock Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
reservedQuantity: { type: Number, comment: "Reserved Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
availableQuantity: { type: Number, comment: "Available Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
, comment: "Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },
updatedAt: { type: Date, comment: "Updated At, p_calendar, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };