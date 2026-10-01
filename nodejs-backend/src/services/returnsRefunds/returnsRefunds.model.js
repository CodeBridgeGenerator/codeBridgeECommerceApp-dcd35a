
    module.exports = function (app) {
        const modelName = "returns_refunds";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            requestNumber: { type:  String , comment: "Request Number, editor, false, true, true, true, true, true, true, , , , ," },
requestType: { type: String , enum: ["Return","Cancellation","Exchange"], comment: "Request Type, dropdownArray, false, true, true, true, true, true, true, , , , ," },
orderNumber: { type: [Schema.Types.ObjectId], ref: "order_product", description: "isArray", comment: "Order Number, multiselect, false, true, true, true, true, true, true, orderProduct, order_product, one-to-many, orderNumber," },
productName: { type: [Schema.Types.ObjectId], ref: "order_product", description: "isArray", comment: "Product Name, multiselect, false, true, true, true, true, true, true, orderProduct, order_product, one-to-many, productName," },
customerName: { type: Schema.Types.ObjectId, ref: "customer", comment: "Customer Name, dropdown, false, true, true, true, true, true, true, customer, customer, one-to-one, customerName," },
reason: { type:  String , comment: "Reason, editor, false, true, true, true, true, true, true, , , , ," },
productDetail: { type:  String , comment: "Product Detail, inputTextarea, false, true, true, true, true, true, true, , , , ," },
photos: { type:  String , comment: "Photos, image, false, true, true, true, true, true, true, , , , ," },
conditon: { type: String , enum: ["Resellable","Damaged","Defective","Return only"], comment: "Conditon, dropdownArray, false, true, true, true, true, true, true, , , , ," },
status: { type: String , enum: ["Requested","Approved","Rejected","Received","Refunded"], comment: "Status, dropdownArray, false, true, true, true, true, true, true, , , , ," },
refundMethod: { type: String , enum: ["Original payment","Store credit","Replacement"], comment: "Refund Method, dropdownArray, false, true, true, true, true, true, true, , , , ," },
refundAmount: { type: Number, max: 10000000, comment: "Refund Amount, currency, false, true, true, true, true, true, true, , , , ," },
refundRef: { type:  String , comment: "Refund Ref, editor, false, true, true, true, true, true, true, , , , ," },
dateReturn: { type: Date, comment: "Date Return, p_date, false, true, true, true, true, true, true, , , , ," },
requestedAt: { type: Date, comment: "Requested At, p_date, false, true, true, true, true, true, true, , , , ," },
refundedAt: { type: Date, comment: "Refunded At, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };