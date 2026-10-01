
    module.exports = function (app) {
        const modelName = "customer_address";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            addressType: { type:  String , maxLength: 150, index: true, trim: true, comment: "Address Type, editor, false, true, true, true, true, true, true, , , , ," },
addressLine1: { type:  String , maxLength: 150, index: true, trim: true, comment: "Address Line 1, editor, false, true, true, true, true, true, true, , , , ," },
addressLine2: { type:  String , maxLength: 150, index: true, trim: true, comment: "Address Line 2, editor, false, true, true, true, true, true, true, , , , ," },
city: { type:  String , maxLength: 150, index: true, trim: true, comment: "City, p, false, true, true, true, true, true, true, , , , ," },
postalCode: { type: Number, comment: "Postal Code, p_number, false, true, true, true, true, true, true, , , , ," },
country: { type:  String , comment: "Country, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };