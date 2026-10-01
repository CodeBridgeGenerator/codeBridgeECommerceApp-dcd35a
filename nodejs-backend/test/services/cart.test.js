const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("cart service", async () => {
  let thisService;
  let cartCreated;
  let usersServiceResults;
  let users;

  const customerAddressCreated = await app.service("customerAddress").Model.create({"customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value"});
const customerCreated = await app.service("customer").Model.create({"customerName":"new value","email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.321Z"});
const couponsCreated = await app.service("coupons").Model.create({"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.321Z","couponCode":"new value","couponName":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.321Z"});

  beforeEach(async () => {
    thisService = await app.service("cart");

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
    assert.ok(thisService, "Registered the service (cart)");
  });

  describe("#create", () => {
    const options = {"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.321Z","couponCode":`${couponsCreated._id}`,"couponName":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.321Z","updatedAt":"2026-10-01T15:57:14.321Z"};

    beforeEach(async () => {
      cartCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new cart", () => {
      assert.strictEqual(cartCreated.customerName.toString(), options.customerName.toString());
assert.strictEqual(cartCreated.couponCode.toString(), options.couponCode.toString());
assert.strictEqual(cartCreated.updatedAt.toISOString(), options.updatedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a cart by ID", async () => {
      const retrieved = await thisService.Model.findById(cartCreated._id);
      assert.strictEqual(retrieved._id.toString(), cartCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"customerName":`${customerCreated._id}`,"couponCode":`${couponsCreated._id}`,"updatedAt":"2026-10-01T15:57:14.321Z"};

    it("should update an existing cart ", async () => {
      const cartUpdated = await thisService.Model.findByIdAndUpdate(
        cartCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(cartUpdated.customerName.toString(), options.customerName.toString());
assert.strictEqual(cartUpdated.couponCode.toString(), options.couponCode.toString());
assert.strictEqual(cartUpdated.updatedAt.toISOString(), options.updatedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a cart", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("customerAddress").Model.findByIdAndDelete(customerAddressCreated._id);
await app.service("customer").Model.findByIdAndDelete(customerCreated._id);
await app.service("coupons").Model.findByIdAndDelete(couponsCreated._id);;

      const cartDeleted = await thisService.Model.findByIdAndDelete(cartCreated._id);
      assert.strictEqual(cartDeleted._id.toString(), cartCreated._id.toString());
    });
  });
});