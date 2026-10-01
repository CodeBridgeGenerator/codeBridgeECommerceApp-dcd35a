const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("products service", async () => {
  let thisService;
  let productCreated;
  let usersServiceResults;
  let users;

  const inventoryCreated = await app.service("inventory").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.246Z"});
const productSizeCreated = await app.service("productSize").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":`${inventoryCreated._id}`,"sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.246Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value"});
const inventoryCreated = await app.service("inventory").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId"});
const productColourCreated = await app.service("productColour").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":"parentObjectId","colorName":"new value","colorCode":"new value"});
const inventoryCreated = await app.service("inventory").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value"});
const productPriceCreated = await app.service("productPrice").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value"});
const productPriceCreated = await app.service("productPrice").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId"});
const productsCreated = await app.service("products").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":`${productPriceCreated._id}`,"status":["new value"]});
const typeOfProductCreated = await app.service("typeOfProduct").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":`${productPriceCreated._id}`,"status":["new value"],"typeOfProduct":"parentObjectId","productType":"new value"});
const productsCreated = await app.service("products").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId","productColour":"parentObjectId","colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId","status":["new value"],"typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId"});
const categoryCreated = await app.service("category").Model.create({"productName":"new value","categoryName":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId","productColour":"parentObjectId","colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId","status":["new value"],"typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":`${productsCreated._id}`});

  beforeEach(async () => {
    thisService = await app.service("products");

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
    assert.ok(thisService, "Registered the service (products)");
  });

  describe("#create", () => {
    const options = {"productName":"new value","categoryName":`${categoryCreated._id}`,"variantName":"parentObjectId","sku":"parentObjectId","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.247Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId","productColour":"parentObjectId","colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId","status":["new value"],"typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":`${productsCreated._id}`};

    beforeEach(async () => {
      productCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new product", () => {
      assert.strictEqual(productCreated.productName, options.productName);
assert.strictEqual(productCreated.categoryName.toString(), options.categoryName.toString());
assert.strictEqual(productCreated.variantName.toString(), options.variantName.toString());
assert.strictEqual(productCreated.productSize.toString(), options.productSize.toString());
assert.strictEqual(productCreated.productStock.toString(), options.productStock.toString());
assert.strictEqual(productCreated.productColour.toString(), options.productColour.toString());
assert.strictEqual(productCreated.sku.toString(), options.sku.toString());
assert.strictEqual(productCreated.price.toString(), options.price.toString());
assert.strictEqual(productCreated.afterDiscount.toString(), options.afterDiscount.toString());
assert.strictEqual(productCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a product by ID", async () => {
      const retrieved = await thisService.Model.findById(productCreated._id);
      assert.strictEqual(retrieved._id.toString(), productCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"productName":"updated value","categoryName":`${categoryCreated._id}`,"variantName":`${inventoryCreated._id}`,"productSize":`${productSizeCreated._id}`,"productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"sku":`${inventoryCreated._id}`,"price":`${productPriceCreated._id}`,"afterDiscount":`${productPriceCreated._id}`,"status":["updated value"]};

    it("should update an existing product ", async () => {
      const productUpdated = await thisService.Model.findByIdAndUpdate(
        productCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(productUpdated.productName, options.productName);
assert.strictEqual(productUpdated.categoryName.toString(), options.categoryName.toString());
assert.strictEqual(productUpdated.variantName.toString(), options.variantName.toString());
assert.strictEqual(productUpdated.productSize.toString(), options.productSize.toString());
assert.strictEqual(productUpdated.productStock.toString(), options.productStock.toString());
assert.strictEqual(productUpdated.productColour.toString(), options.productColour.toString());
assert.strictEqual(productUpdated.sku.toString(), options.sku.toString());
assert.strictEqual(productUpdated.price.toString(), options.price.toString());
assert.strictEqual(productUpdated.afterDiscount.toString(), options.afterDiscount.toString());
assert.strictEqual(productUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a product", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("inventory").Model.findByIdAndDelete(inventoryCreated._id);
await app.service("productSize").Model.findByIdAndDelete(productSizeCreated._id);
await app.service("productColour").Model.findByIdAndDelete(productColourCreated._id);
await app.service("productPrice").Model.findByIdAndDelete(productPriceCreated._id);
await app.service("products").Model.findByIdAndDelete(productsCreated._id);
await app.service("typeOfProduct").Model.findByIdAndDelete(typeOfProductCreated._id);
await app.service("category").Model.findByIdAndDelete(categoryCreated._id);;

      const productDeleted = await thisService.Model.findByIdAndDelete(productCreated._id);
      assert.strictEqual(productDeleted._id.toString(), productCreated._id.toString());
    });
  });
});