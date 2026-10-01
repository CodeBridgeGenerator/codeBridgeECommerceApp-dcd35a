const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("orders service", async () => {
  let thisService;
  let orderCreated;
  let usersServiceResults;
  let users;

  const customerCreated = await app.service("customer").Model.create({"orderNumber":"new value","customerName":"new value","email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.174Z"});
const couponsCreated = await app.service("coupons").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.174Z","paymentNumber":"new value","couponName":"new value","couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.174Z"});
const inventoryCreated = await app.service("inventory").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.174Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.174Z","subtotal":"parentObjectId","productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.175Z"});
const inventoryCreated = await app.service("inventory").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.174Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.174Z","subtotal":"parentObjectId","productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.175Z","option":"new value","price":23,"afterDiscount":23});
const productsCreated = await app.service("products").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.174Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.174Z","subtotal":"parentObjectId","productName":"new value","categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockQuantity":`${inventoryCreated._id}`,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.175Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"]});
const categoryCreated = await app.service("category").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.174Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.174Z","subtotal":"parentObjectId","productName":`${productsCreated._id}`,"categoryName":"parentObjectId","variantName":"new value","sku":"new value","stockQuantity":`${inventoryCreated._id}`,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.175Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23});
const productsCreated = await app.service("products").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.174Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.174Z","subtotal":"parentObjectId","productName":`${productsCreated._id}`,"categoryName":`${categoryCreated._id}`,"variantName":"parentObjectId","sku":"parentObjectId","stockQuantity":"parentObjectId","reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.175Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23});
const productsCreated = await app.service("products").Model.create({"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.174Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.174Z","subtotal":`${productsCreated._id}`,"productName":"new value","categoryName":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockQuantity":"parentObjectId","reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.175Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23,"discount":"parentObjectId"});

  beforeEach(async () => {
    thisService = await app.service("orders");

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
    assert.ok(thisService, "Registered the service (orders)");
  });

  describe("#create", () => {
    const options = {"orderNumber":"new value","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":"new value","joinedAt":"2026-10-01T08:52:49.174Z","paymentNumber":"new value","couponName":`${couponsCreated._id}`,"couponCode":"new value","minimumOrder":23,"validUntil":"2026-10-01T08:52:49.174Z","subtotal":`${productsCreated._id}`,"productName":"new value","categoryName":"parentObjectId","variantName":"parentObjectId","sku":"parentObjectId","stockQuantity":"parentObjectId","reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T08:52:49.175Z","option":"new value","price":23,"afterDiscount":23,"status":["new value"],"description":"new value","image":"new value","showInMenu":["new value"],"productsTotal":23,"discount":`${productsCreated._id}`,"placedOrderDate":"2026-10-01T08:52:49.175Z"};

    beforeEach(async () => {
      orderCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new order", () => {
      assert.strictEqual(orderCreated.orderNumber, options.orderNumber);
assert.strictEqual(orderCreated.customerName.toString(), options.customerName.toString());
assert.strictEqual(orderCreated.paymentNumber, options.paymentNumber);
assert.strictEqual(orderCreated.couponName.toString(), options.couponName.toString());
assert.strictEqual(orderCreated.subtotal.toString(), options.subtotal.toString());
assert.strictEqual(orderCreated.discount.toString(), options.discount.toString());
assert.strictEqual(orderCreated.status, options.status);
assert.strictEqual(orderCreated.placedOrderDate.toISOString(), options.placedOrderDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a order by ID", async () => {
      const retrieved = await thisService.Model.findById(orderCreated._id);
      assert.strictEqual(retrieved._id.toString(), orderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"orderNumber":"updated value","customerName":`${customerCreated._id}`,"paymentNumber":"updated value","couponName":`${couponsCreated._id}`,"subtotal":`${productsCreated._id}`,"discount":`${productsCreated._id}`,"status":["updated value"],"placedOrderDate":"2026-10-01T08:52:49.175Z"};

    it("should update an existing order ", async () => {
      const orderUpdated = await thisService.Model.findByIdAndUpdate(
        orderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(orderUpdated.orderNumber, options.orderNumber);
assert.strictEqual(orderUpdated.customerName.toString(), options.customerName.toString());
assert.strictEqual(orderUpdated.paymentNumber, options.paymentNumber);
assert.strictEqual(orderUpdated.couponName.toString(), options.couponName.toString());
assert.strictEqual(orderUpdated.subtotal.toString(), options.subtotal.toString());
assert.strictEqual(orderUpdated.discount.toString(), options.discount.toString());
assert.strictEqual(orderUpdated.status, options.status);
assert.strictEqual(orderUpdated.placedOrderDate.toISOString(), options.placedOrderDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a order", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("customer").Model.findByIdAndDelete(customerCreated._id);
await app.service("coupons").Model.findByIdAndDelete(couponsCreated._id);
await app.service("inventory").Model.findByIdAndDelete(inventoryCreated._id);
await app.service("products").Model.findByIdAndDelete(productsCreated._id);
await app.service("category").Model.findByIdAndDelete(categoryCreated._id);;

      const orderDeleted = await thisService.Model.findByIdAndDelete(orderCreated._id);
      assert.strictEqual(orderDeleted._id.toString(), orderCreated._id.toString());
    });
  });
});