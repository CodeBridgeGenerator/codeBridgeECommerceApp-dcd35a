const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("coupons service", async () => {
  let thisService;
  let couponCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("coupons");

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
    assert.ok(thisService, "Registered the service (coupons)");
  });

  describe("#create", () => {
    const options = {"couponName":"new value","couponCode":"new value","minimumOrder":"new value","validUntil":"2026-10-01T15:57:14.417Z"};

    beforeEach(async () => {
      couponCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new coupon", () => {
      assert.strictEqual(couponCreated.couponName, options.couponName);
assert.strictEqual(couponCreated.couponCode, options.couponCode);
assert.strictEqual(couponCreated.minimumOrder, options.minimumOrder);
assert.strictEqual(couponCreated.validUntil.toISOString(), options.validUntil);
    });
  });

  describe("#get", () => {
    it("should retrieve a coupon by ID", async () => {
      const retrieved = await thisService.Model.findById(couponCreated._id);
      assert.strictEqual(retrieved._id.toString(), couponCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"couponName":"updated value","couponCode":"updated value","minimumOrder":"updated value","validUntil":"2026-10-01T15:57:14.417Z"};

    it("should update an existing coupon ", async () => {
      const couponUpdated = await thisService.Model.findByIdAndUpdate(
        couponCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(couponUpdated.couponName, options.couponName);
assert.strictEqual(couponUpdated.couponCode, options.couponCode);
assert.strictEqual(couponUpdated.minimumOrder, options.minimumOrder);
assert.strictEqual(couponUpdated.validUntil.toISOString(), options.validUntil);
    });
  });

  describe("#delete", async () => {
    it("should delete a coupon", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const couponDeleted = await thisService.Model.findByIdAndDelete(couponCreated._id);
      assert.strictEqual(couponDeleted._id.toString(), couponCreated._id.toString());
    });
  });
});