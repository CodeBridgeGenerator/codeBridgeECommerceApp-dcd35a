
    module.exports = function (app) {
        const modelName = "customer";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerName: { type:  String , comment: "Customer Name, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
phoneNumber: { type: Number, comment: "Phone Number, p_number, false, true, true, true, true, true, true, , , , ," },
address: { type: [Schema.Types.ObjectId], ref: "customer_address", description: "isArray", comment: "Address, multiselect, false, true, true, true, true, true, true, customerAddress, customer_address, one-to-many, addressType:addressLine1:addressLine2:city:postalCode:country," },
joinedAt: { type: Date, comment: "Joined At, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };