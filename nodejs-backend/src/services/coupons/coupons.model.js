
    module.exports = function (app) {
        const modelName = "coupons";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            couponName: { type:  String , comment: "Coupon Name, p, false, true, true, true, true, true, true, , , , ," },
couponCode: { type:  String , comment: "Coupon Code, p, false, true, true, true, true, true, true, , , , ," },
, comment: "Type of Coupon, p, false, true, true, true, true, true, true, , , , ," },
minimumOrder: { type:  String , maxLength: 150, index: true, trim: true, comment: "Minimum Order, p, false, true, true, true, true, true, true, , , , ," },
validUntil: { type: Date, comment: "Valid Until, p_calendar, false, true, true, true, true, true, true, , , , ," },
, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };