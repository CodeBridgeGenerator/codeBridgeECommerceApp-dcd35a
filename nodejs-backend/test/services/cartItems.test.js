const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("cartItems service", async () => {
  let thisService;
  let cartItemCreated;
  let usersServiceResults;
  let users;

  const customerAddressCreated = await app.service("customerAddress").Model.create({"cartItem":"parentObjectId","customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value"});
const customerCreated = await app.service("customer").Model.create({"cartItem":"parentObjectId","customerName":"new value","email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.333Z"});
const couponsCreated = await app.service("coupons").Model.create({"cartItem":"parentObjectId","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.333Z","couponCode":"new value","couponName":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.333Z"});
const cartCreated = await app.service("cart").Model.create({"cartItem":"parentObjectId","customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.333Z","couponCode":`${couponsCreated._id}`,"couponName":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.333Z","updatedAt":"2026-10-01T15:57:14.333Z"});
const inventoryCreated = await app.service("inventory").Model.create({"cartItem":`${cartCreated._id}`,"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.333Z","couponCode":`${couponsCreated._id}`,"couponName":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.333Z","updatedAt":"2026-10-01T15:57:14.333Z","variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23});

  beforeEach(async () => {
    thisService = await app.service("cartItems");

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
    assert.ok(thisService, "Registered the service (cartItems)");
  });

  describe("#create", () => {
    const options = {"cartItem":`${cartCreated._id}`,"customerName":`${customerCreated._id}`,"email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.333Z","couponCode":`${couponsCreated._id}`,"couponName":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.333Z","updatedAt":"2026-10-01T15:57:14.333Z","variantName":`${inventoryCreated._id}`,"sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"quantity":23,"addedAt":"2026-10-01T15:57:14.333Z"};

    beforeEach(async () => {
      cartItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new cartItem", () => {
      assert.strictEqual(cartItemCreated.cartItem.toString(), options.cartItem.toString());
assert.strictEqual(cartItemCreated.variantName.toString(), options.variantName.toString());
assert.strictEqual(cartItemCreated.quantity, options.quantity);
assert.strictEqual(cartItemCreated.addedAt.toISOString(), options.addedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a cartItem by ID", async () => {
      const retrieved = await thisService.Model.findById(cartItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), cartItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"cartItem":`${cartCreated._id}`,"variantName":`${inventoryCreated._id}`,"quantity":100,"addedAt":"2026-10-01T15:57:14.333Z"};

    it("should update an existing cartItem ", async () => {
      const cartItemUpdated = await thisService.Model.findByIdAndUpdate(
        cartItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(cartItemUpdated.cartItem.toString(), options.cartItem.toString());
assert.strictEqual(cartItemUpdated.variantName.toString(), options.variantName.toString());
assert.strictEqual(cartItemUpdated.quantity, options.quantity);
assert.strictEqual(cartItemUpdated.addedAt.toISOString(), options.addedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a cartItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("customerAddress").Model.findByIdAndDelete(customerAddressCreated._id);
await app.service("customer").Model.findByIdAndDelete(customerCreated._id);
await app.service("coupons").Model.findByIdAndDelete(couponsCreated._id);
await app.service("cart").Model.findByIdAndDelete(cartCreated._id);
await app.service("inventory").Model.findByIdAndDelete(inventoryCreated._id);;

      const cartItemDeleted = await thisService.Model.findByIdAndDelete(cartItemCreated._id);
      assert.strictEqual(cartItemDeleted._id.toString(), cartItemCreated._id.toString());
    });
  });
});