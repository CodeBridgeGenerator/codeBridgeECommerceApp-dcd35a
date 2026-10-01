
    module.exports = function (app) {
        const modelName = "category";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            categoryName: { type:  String , comment: "Category Name, inputTextarea, false, true, true, true, true, true, true, , , , ," },
productName: { type: [Schema.Types.ObjectId], ref: "products", description: "isArray", comment: "Product Name, multiselect, false, true, true, true, true, true, true, products, products, one-to-many, productName," },
typeOfProduct: { type: [Schema.Types.ObjectId], ref: "type_of_product", description: "isArray", comment: "Type Of Product, multiselect, false, true, true, true, true, true, true, typeOfProduct, type_of_product, one-to-many, productType:productName," },
description: { type:  String , comment: "Description, editor, false, true, true, true, true, true, true, , , , ," },
image: { type:  [Schema.Types.ObjectId], ref: "document_storages" , comment: "Image, file_upload, false, true, true, true, true, true, true, , , , ," },
showInMenu: { type: String , enum: ["Yes","No"], comment: "Show In Menu, dropdownArray, false, true, true, true, true, true, true, , , , ," },
productsTotal: { type: [Schema.Types.ObjectId], ref: "products", description: "isArray", comment: "Products Total, dropdown, false, true, true, true, true, true, true, products, products, one-to-one, price," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };