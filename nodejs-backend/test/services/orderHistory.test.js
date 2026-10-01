const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("orderHistory service", async () => {
  let thisService;
  let orderHistoryCreated;
  let usersServiceResults;
  let users;

  const customerAddressCreated = await app.service("customerAddress").Model.create({"customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value"});
const customerCreated = await app.service("customer").Model.create({"customerName":"new value","email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z"});
const typeOfProductCreated = await app.service("typeOfProduct").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"new value","typeOfProduct":"parentObjectId","productType":"new value"});
const inventoryCreated = await app.service("inventory").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"parentObjectId","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.403Z"});
const productSizeCreated = await app.service("productSize").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"parentObjectId","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":`${inventoryCreated._id}`,"sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.403Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value"});
const inventoryCreated = await app.service("inventory").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"parentObjectId","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.404Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId"});
const productColourCreated = await app.service("productColour").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"parentObjectId","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.404Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":"parentObjectId","colorName":"new value","colorCode":"new value"});
const inventoryCreated = await app.service("inventory").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"parentObjectId","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.404Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value"});
const productPriceCreated = await app.service("productPrice").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"parentObjectId","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.404Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value"});
const productPriceCreated = await app.service("productPrice").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"parentObjectId","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.404Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId"});
const productsCreated = await app.service("products").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"parentObjectId","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":"parentObjectId","variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.404Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":`${productPriceCreated._id}`,"status":["new value"]});
const categoryCreated = await app.service("category").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":"parentObjectId","typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":`${productsCreated._id}`,"variantName":"new value","sku":`${inventoryCreated._id}`,"stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.404Z","productSize":`${productSizeCreated._id}`,"sizeCategory":"new value","sizeValue":"new value","productStock":`${inventoryCreated._id}`,"productColour":`${productColourCreated._id}`,"colorName":"new value","colorCode":"new value","price":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":`${productPriceCreated._id}`,"status":["new value"]});
const productsCreated = await app.service("products").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":"new value","categoryName":`${categoryCreated._id}`,"typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":`${productsCreated._id}`,"variantName":"parentObjectId","sku":"parentObjectId","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.404Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId","productColour":"parentObjectId","colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId","status":["new value"]});

  beforeEach(async () => {
    thisService = await app.service("orderHistory");

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
    assert.ok(thisService, "Registered the service (orderHistory)");
  });

  describe("#create", () => {
    const options = {"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.403Z","productName":`${productsCreated._id}`,"categoryName":`${categoryCreated._id}`,"typeOfProduct":`${typeOfProductCreated._id}`,"productType":"new value","description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":`${productsCreated._id}`,"variantName":"parentObjectId","sku":"parentObjectId","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.404Z","productSize":"parentObjectId","sizeCategory":"new value","sizeValue":"new value","productStock":"parentObjectId","productColour":"parentObjectId","colorName":"new value","colorCode":"new value","price":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value","afterDiscount":"parentObjectId","status":["new value"],"purchaseDate":"2026-10-01T15:57:14.405Z","paymentMethod":"new value"};

    beforeEach(async () => {
      orderHistoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new orderHistory", () => {
      assert.strictEqual(orderHistoryCreated.customerName.toString(), options.customerName.toString());
assert.strictEqual(orderHistoryCreated.productName.toString(), options.productName.toString());
assert.strictEqual(orderHistoryCreated.purchaseDate.toISOString(), options.purchaseDate);
assert.strictEqual(orderHistoryCreated.paymentMethod, options.paymentMethod);
    });
  });

  describe("#get", () => {
    it("should retrieve a orderHistory by ID", async () => {
      const retrieved = await thisService.Model.findById(orderHistoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), orderHistoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"customerName":`${customerCreated._id}`,"productName":`${productsCreated._id}`,"purchaseDate":"2026-10-01T15:57:14.405Z","paymentMethod":"updated value"};

    it("should update an existing orderHistory ", async () => {
      const orderHistoryUpdated = await thisService.Model.findByIdAndUpdate(
        orderHistoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(orderHistoryUpdated.customerName.toString(), options.customerName.toString());
assert.strictEqual(orderHistoryUpdated.productName.toString(), options.productName.toString());
assert.strictEqual(orderHistoryUpdated.purchaseDate.toISOString(), options.purchaseDate);
assert.strictEqual(orderHistoryUpdated.paymentMethod, options.paymentMethod);
    });
  });

  describe("#delete", async () => {
    it("should delete a orderHistory", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("customerAddress").Model.findByIdAndDelete(customerAddressCreated._id);
await app.service("customer").Model.findByIdAndDelete(customerCreated._id);
await app.service("typeOfProduct").Model.findByIdAndDelete(typeOfProductCreated._id);
await app.service("inventory").Model.findByIdAndDelete(inventoryCreated._id);
await app.service("productSize").Model.findByIdAndDelete(productSizeCreated._id);
await app.service("productColour").Model.findByIdAndDelete(productColourCreated._id);
await app.service("productPrice").Model.findByIdAndDelete(productPriceCreated._id);
await app.service("products").Model.findByIdAndDelete(productsCreated._id);
await app.service("category").Model.findByIdAndDelete(categoryCreated._id);;

      const orderHistoryDeleted = await thisService.Model.findByIdAndDelete(orderHistoryCreated._id);
      assert.strictEqual(orderHistoryDeleted._id.toString(), orderHistoryCreated._id.toString());
    });
  });
});