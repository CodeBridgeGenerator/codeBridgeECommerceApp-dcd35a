const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("orderItems service", async () => {
  let thisService;
  let orderItemCreated;
  let usersServiceResults;
  let users;

  const customerCreated = await app.service("customer").Model.create({"orderNumber":"new value","customerName":"new value","email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z"});
const couponsCreated = await app.service("coupons").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":"new value","couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z"});
const inventoryCreated = await app.service("inventory").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":"parentObjectId","productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.188Z"});
const inventoryCreated = await app.service("inventory").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":"parentObjectId","productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.188Z","option":"new value","price":23,"afterDiscount":23});
const productsCreated = await app.service("products").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":"parentObjectId","productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockQuantity":`${inventoryCreated._id}`,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.188Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"]});
const categoryCreated = await app.service("category").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":"parentObjectId","productName":`${productsCreated._id}`,"categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockQuantity":`${inventoryCreated._id}`,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.188Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23});
const productsCreated = await app.service("products").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":"parentObjectId","productName":`${productsCreated._id}`,"categoryName":`${categoryCreated._id}`,"variantName":"parentObjectId","sku":"parentObjectId","stockQuantity":"parentObjectId","reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.188Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23});
const productsCreated = await app.service("products").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":`${productsCreated._id}`,"productName":"new value","categoryName":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockQuantity":"parentObjectId","reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.188Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23,"discount":"parentObjectId"});
const ordersCreated = await app.service("orders").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":`${productsCreated._id}`,"productName":"new value","categoryName":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockQuantity":"parentObjectId","reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.188Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23,"discount":`${productsCreated._id}`,"placedOrderDate":"2026-10-01T08:52:49.189Z"});
const inventoryCreated = await app.service("inventory").Model.create({"orderNumber":`${ordersCreated._id}`,"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":`${productsCreated._id}`,"productName":"parentObjectId","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.189Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23,"discount":`${productsCreated._id}`,"placedOrderDate":"2026-10-01T08:52:49.189Z","quantity":"parentObjectId"});
const productsCreated = await app.service("products").Model.create({"orderNumber":`${ordersCreated._id}`,"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":`${productsCreated._id}`,"productName":"new value","categoryName":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockQuantity":"parentObjectId","reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.189Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23,"discount":`${productsCreated._id}`,"placedOrderDate":"2026-10-01T08:52:49.189Z","quantity":`${inventoryCreated._id}`,"unitPrice":"parentObjectId"});
const productsCreated = await app.service("products").Model.create({"orderNumber":`${ordersCreated._id}`,"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":`${productsCreated._id}`,"productName":"new value","categoryName":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockQuantity":"parentObjectId","reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.189Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23,"discount":`${productsCreated._id}`,"placedOrderDate":"2026-10-01T08:52:49.189Z","quantity":`${inventoryCreated._id}`,"unitPrice":`${productsCreated._id}`,"netTotal":"parentObjectId"});

  beforeEach(async () => {
    thisService = await app.service("orderItems");

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
    assert.ok(thisService, "Registered the service (orderItems)");
  });

  describe("#create", () => {
    const options = {"orderNumber":`${ordersCreated._id}`,"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.188Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.188Z","subtotal":`${productsCreated._id}`,"productName":"new value","categoryName":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockQuantity":"parentObjectId","reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.189Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23,"discount":`${productsCreated._id}`,"placedOrderDate":"2026-10-01T08:52:49.189Z","quantity":`${inventoryCreated._id}`,"unitPrice":`${productsCreated._id}`,"netTotal":`${productsCreated._id}`};

    beforeEach(async () => {
      orderItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new orderItem", () => {
      assert.strictEqual(orderItemCreated.orderNumber.toString(), options.orderNumber.toString());
assert.strictEqual(orderItemCreated.productName.toString(), options.productName.toString());
assert.strictEqual(orderItemCreated.variantName.toString(), options.variantName.toString());
assert.strictEqual(orderItemCreated.quantity.toString(), options.quantity.toString());
assert.strictEqual(orderItemCreated.unitPrice.toString(), options.unitPrice.toString());
assert.strictEqual(orderItemCreated.netTotal.toString(), options.netTotal.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a orderItem by ID", async () => {
      const retrieved = await thisService.Model.findById(orderItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), orderItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"orderNumber":`${ordersCreated._id}`,"productName":`${productsCreated._id}`,"variantName":`${inventoryCreated._id}`,"quantity":`${inventoryCreated._id}`,"unitPrice":`${productsCreated._id}`,"netTotal":`${productsCreated._id}`};

    it("should update an existing orderItem ", async () => {
      const orderItemUpdated = await thisService.Model.findByIdAndUpdate(
        orderItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(orderItemUpdated.orderNumber.toString(), options.orderNumber.toString());
assert.strictEqual(orderItemUpdated.productName.toString(), options.productName.toString());
assert.strictEqual(orderItemUpdated.variantName.toString(), options.variantName.toString());
assert.strictEqual(orderItemUpdated.quantity.toString(), options.quantity.toString());
assert.strictEqual(orderItemUpdated.unitPrice.toString(), options.unitPrice.toString());
assert.strictEqual(orderItemUpdated.netTotal.toString(), options.netTotal.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a orderItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("customer").Model.findByIdAndDelete(customerCreated._id);
await app.service("coupons").Model.findByIdAndDelete(couponsCreated._id);
await app.service("inventory").Model.findByIdAndDelete(inventoryCreated._id);
await app.service("products").Model.findByIdAndDelete(productsCreated._id);
await app.service("category").Model.findByIdAndDelete(categoryCreated._id);
await app.service("orders").Model.findByIdAndDelete(ordersCreated._id);;

      const orderItemDeleted = await thisService.Model.findByIdAndDelete(orderItemCreated._id);
      assert.strictEqual(orderItemDeleted._id.toString(), orderItemCreated._id.toString());
    });
  });
});