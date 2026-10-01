const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("order service", async () => {
  let thisService;
  let orderCreated;
  let usersServiceResults;
  let users;

  const customerAddressCreated = await app.service("customerAddress").Model.create({"orderNumber":"new value","customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value"});
const customerCreated = await app.service("customer").Model.create({"orderNumber":"new value","customerName":"new value","email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.367Z"});
const customerCreated = await app.service("customer").Model.create({"orderNumber":"new value","customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.367Z","emailContact":"parentObjectId"});
const customerCreated = await app.service("customer").Model.create({"orderNumber":"new value","customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.368Z","emailContact":`${customerCreated._id}`,"phoneContact":"parentObjectId"});
const couponsCreated = await app.service("coupons").Model.create({"orderNumber":"new value","customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.368Z","emailContact":`${customerCreated._id}`,"phoneContact":`${customerCreated._id}`,"subtotal":23,"coupon":"parentObjectId","couponName":"new value","couponCode":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.368Z"});
const productPriceCreated = await app.service("productPrice").Model.create({"orderNumber":"new value","customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.368Z","emailContact":`${customerCreated._id}`,"phoneContact":`${customerCreated._id}`,"subtotal":23,"coupon":`${couponsCreated._id}`,"couponName":"new value","couponCode":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.368Z","discount":"parentObjectId","basePrice":23,"discountPrice":23,"taxPercentage":"new value"});

  beforeEach(async () => {
    thisService = await app.service("order");

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
    assert.ok(thisService, "Registered the service (order)");
  });

  describe("#create", () => {
    const options = {"orderNumber":"new value","customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.368Z","emailContact":`${customerCreated._id}`,"phoneContact":`${customerCreated._id}`,"subtotal":23,"coupon":`${couponsCreated._id}`,"couponName":"new value","couponCode":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.368Z","discount":`${productPriceCreated._id}`,"basePrice":23,"discountPrice":23,"taxPercentage":"new value","shippingFee":23,"placedOrderDate":"2026-10-01T15:57:14.368Z","tax":23};

    beforeEach(async () => {
      orderCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new order", () => {
      assert.strictEqual(orderCreated.orderNumber, options.orderNumber);
assert.strictEqual(orderCreated.customerName.toString(), options.customerName.toString());
assert.strictEqual(orderCreated.emailContact.toString(), options.emailContact.toString());
assert.strictEqual(orderCreated.phoneContact.toString(), options.phoneContact.toString());
assert.strictEqual(orderCreated.subtotal, options.subtotal);
assert.strictEqual(orderCreated.coupon.toString(), options.coupon.toString());
assert.strictEqual(orderCreated.discount.toString(), options.discount.toString());
assert.strictEqual(orderCreated.shippingFee, options.shippingFee);
assert.strictEqual(orderCreated.placedOrderDate.toISOString(), options.placedOrderDate);
assert.strictEqual(orderCreated.tax, options.tax);
    });
  });

  describe("#get", () => {
    it("should retrieve a order by ID", async () => {
      const retrieved = await thisService.Model.findById(orderCreated._id);
      assert.strictEqual(retrieved._id.toString(), orderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"orderNumber":"updated value","customerName":`${customerCreated._id}`,"emailContact":`${customerCreated._id}`,"phoneContact":`${customerCreated._id}`,"subtotal":100,"coupon":`${couponsCreated._id}`,"discount":`${productPriceCreated._id}`,"shippingFee":100,"placedOrderDate":"2026-10-01T15:57:14.368Z","tax":100};

    it("should update an existing order ", async () => {
      const orderUpdated = await thisService.Model.findByIdAndUpdate(
        orderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(orderUpdated.orderNumber, options.orderNumber);
assert.strictEqual(orderUpdated.customerName.toString(), options.customerName.toString());
assert.strictEqual(orderUpdated.emailContact.toString(), options.emailContact.toString());
assert.strictEqual(orderUpdated.phoneContact.toString(), options.phoneContact.toString());
assert.strictEqual(orderUpdated.subtotal, options.subtotal);
assert.strictEqual(orderUpdated.coupon.toString(), options.coupon.toString());
assert.strictEqual(orderUpdated.discount.toString(), options.discount.toString());
assert.strictEqual(orderUpdated.shippingFee, options.shippingFee);
assert.strictEqual(orderUpdated.placedOrderDate.toISOString(), options.placedOrderDate);
assert.strictEqual(orderUpdated.tax, options.tax);
    });
  });

  describe("#delete", async () => {
    it("should delete a order", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("customerAddress").Model.findByIdAndDelete(customerAddressCreated._id);
await app.service("customer").Model.findByIdAndDelete(customerCreated._id);
await app.service("coupons").Model.findByIdAndDelete(couponsCreated._id);
await app.service("productPrice").Model.findByIdAndDelete(productPriceCreated._id);;

      const orderDeleted = await thisService.Model.findByIdAndDelete(orderCreated._id);
      assert.strictEqual(orderDeleted._id.toString(), orderCreated._id.toString());
    });
  });
});