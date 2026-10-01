const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("inventory service", async () => {
  let thisService;
  let inventoryCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("inventory");

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
    assert.ok(thisService, "Registered the service (inventory)");
  });

  describe("#create", () => {
    const options = {"variantName":"new value","sku":"new value","stockType":"new value","stockQuantity":23,"reservedQuantity":23,"availableQuantity":23,"updatedAt":"2026-10-01T15:57:14.300Z"};

    beforeEach(async () => {
      inventoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new inventory", () => {
      assert.strictEqual(inventoryCreated.variantName, options.variantName);
assert.strictEqual(inventoryCreated.sku, options.sku);
assert.strictEqual(inventoryCreated.stockType, options.stockType);
assert.strictEqual(inventoryCreated.stockQuantity, options.stockQuantity);
assert.strictEqual(inventoryCreated.reservedQuantity, options.reservedQuantity);
assert.strictEqual(inventoryCreated.availableQuantity, options.availableQuantity);
assert.strictEqual(inventoryCreated.updatedAt.toISOString(), options.updatedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a inventory by ID", async () => {
      const retrieved = await thisService.Model.findById(inventoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), inventoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"variantName":"updated value","sku":"updated value","stockType":"updated value","stockQuantity":100,"reservedQuantity":100,"availableQuantity":100,"updatedAt":"2026-10-01T15:57:14.300Z"};

    it("should update an existing inventory ", async () => {
      const inventoryUpdated = await thisService.Model.findByIdAndUpdate(
        inventoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(inventoryUpdated.variantName, options.variantName);
assert.strictEqual(inventoryUpdated.sku, options.sku);
assert.strictEqual(inventoryUpdated.stockType, options.stockType);
assert.strictEqual(inventoryUpdated.stockQuantity, options.stockQuantity);
assert.strictEqual(inventoryUpdated.reservedQuantity, options.reservedQuantity);
assert.strictEqual(inventoryUpdated.availableQuantity, options.availableQuantity);
assert.strictEqual(inventoryUpdated.updatedAt.toISOString(), options.updatedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a inventory", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const inventoryDeleted = await thisService.Model.findByIdAndDelete(inventoryCreated._id);
      assert.strictEqual(inventoryDeleted._id.toString(), inventoryCreated._id.toString());
    });
  });
});