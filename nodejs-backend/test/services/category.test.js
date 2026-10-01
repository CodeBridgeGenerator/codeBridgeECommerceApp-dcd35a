const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("category service", async () => {
  let thisService;
  let categoryCreated;
  let usersServiceResults;
  let users;

  const typeOfProductCreated = await app.service("typeOfProduct").Model.create({"categoryName":"new value","productName":"new value","typeOfProduct":"parentObjectId","productType":"new value"});
const inventoryCreated = await app.service("inventory").Model.create({"categoryName":"parentObjectId","productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z"});
const productSizeCreated = await app.service("productSize").Model.create({"categoryName":"parentObjectId","productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":`${inventoryCreated._id}`,"sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value"});
const inventoryCreated = await app.service("inventory").Model.create({"categoryName":"parentObjectId","productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId"});
const productColourCreated = await app.service("productColour").Model.create({"categoryName":"parentObjectId","productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":"parentObjectId","colorName":"new value","colorCode":"new value"});
const inventoryCreated = await app.service("inventory").Model.create({"categoryName":"parentObjectId","productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value"});
const productPriceCreated = await app.service("productPrice").Model.create({"categoryName":"parentObjectId","productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value"});
const productPriceCreated = await app.service("productPrice").Model.create({"categoryName":"parentObjectId","productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId"});
const productsCreated = await app.service("products").Model.create({"categoryName":"parentObjectId","productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":`${productPriceCreated._id}`,"status":["new value"]});
const categoryCreated = await app.service("category").Model.create({"categoryName":"parentObjectId","productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":`${productsCreated._id}`,"variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":`${productPriceCreated._id}`,"status":["new value"]});
const productsCreated = await app.service("products").Model.create({"categoryName":`${categoryCreated._id}`,"productName":"new value","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":`${productsCreated._id}`,"variantName":"parentObjectId","sku":"parentObjectId","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId","productColour":"parentObjectId","colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId","status":["new value"]});

  beforeEach(async () => {
    thisService = await app.service("category");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (category)");
  });

  describe("#create", () => {
    const options = {"categoryName":`${categoryCreated._id}`,"productName":`${productsCreated._id}`,"typeOfProduct":"parentObjectId","productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.217Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId","productColour":"parentObjectId","colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId","status":["new value"]};

    beforeEach(async () => {
      categoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new category", () => {
      assert.strictEqual(categoryCreated.categoryName, options.categoryName);
assert.strictEqual(categoryCreated.productName.toString(), options.productName.toString());
assert.strictEqual(categoryCreated.typeOfProduct.toString(), options.typeOfProduct.toString());
assert.strictEqual(categoryCreated.description, options.description);
assert.strictEqual(categoryCreated.image, options.image);
assert.strictEqual(categoryCreated.showInMenu, options.showInMenu);
assert.strictEqual(categoryCreated.productsTotal.toString(), options.productsTotal.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a category by ID", async () => {
      const retrieved = await thisService.Model.findById(categoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), categoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"categoryName":"updated value","productName":`${productsCreated._id}`,"typeOfProduct":`${typeOfProductCreated._id}`,"description":"updated value","image":"updated value","showInMenu":["updated value"],"productsTotal":`${productsCreated._id}`};

    it("should update an existing category ", async () => {
      const categoryUpdated = await thisService.Model.findByIdAndUpdate(
        categoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(categoryUpdated.categoryName, options.categoryName);
assert.strictEqual(categoryUpdated.productName.toString(), options.productName.toString());
assert.strictEqual(categoryUpdated.typeOfProduct.toString(), options.typeOfProduct.toString());
assert.strictEqual(categoryUpdated.description, options.description);
assert.strictEqual(categoryUpdated.image, options.image);
assert.strictEqual(categoryUpdated.showInMenu, options.showInMenu);
assert.strictEqual(categoryUpdated.productsTotal.toString(), options.productsTotal.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a category", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("typeOfProduct").Model.findByIdAndDelete(typeOfProductCreated._id);
await app.service("inventory").Model.findByIdAndDelete(inventoryCreated._id);
await app.service("productSize").Model.findByIdAndDelete(productSizeCreated._id);
await app.service("productColour").Model.findByIdAndDelete(productColourCreated._id);
await app.service("productPrice").Model.findByIdAndDelete(productPriceCreated._id);
await app.service("products").Model.findByIdAndDelete(productsCreated._id);
await app.service("category").Model.findByIdAndDelete(categoryCreated._id);;

      const categoryDeleted = await thisService.Model.findByIdAndDelete(categoryCreated._id);
      assert.strictEqual(categoryDeleted._id.toString(), categoryCreated._id.toString());
    });
  });
});