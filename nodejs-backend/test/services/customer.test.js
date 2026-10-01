const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("customer service", async () => {
  let thisService;
  let customerCreated;
  let usersServiceResults;
  let users;

  const customerAddressCreated = await app.service("customerAddress").Model.create({"customerName":"new value","email":"new value","phoneNumber":23,"address":"parentObjectId","addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value"});

  beforeEach(async () => {
    thisService = await app.service("customer");

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
    assert.ok(thisService, "Registered the service (customer)");
  });

  describe("#create", () => {
    const options = {"customerName":"new value","email":"new value","phoneNumber":23,"address":`${customerAddressCreated._id}`,"addressType":"new value","addressLine1":"new value","addressLine2":"new value","city":"new value","postalCode":23,"country":"new value","joinedAt":"2026-10-01T15:57:14.466Z"};

    beforeEach(async () => {
      customerCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new customer", () => {
      assert.strictEqual(customerCreated.customerName, options.customerName);
assert.strictEqual(customerCreated.email, options.email);
assert.strictEqual(customerCreated.phoneNumber, options.phoneNumber);
assert.strictEqual(customerCreated.address.toString(), options.address.toString());
assert.strictEqual(customerCreated.joinedAt.toISOString(), options.joinedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a customer by ID", async () => {
      const retrieved = await thisService.Model.findById(customerCreated._id);
      assert.strictEqual(retrieved._id.toString(), customerCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"customerName":"updated value","email":"updated value","phoneNumber":100,"address":`${customerAddressCreated._id}`,"joinedAt":"2026-10-01T15:57:14.466Z"};

    it("should update an existing customer ", async () => {
      const customerUpdated = await thisService.Model.findByIdAndUpdate(
        customerCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(customerUpdated.customerName, options.customerName);
assert.strictEqual(customerUpdated.email, options.email);
assert.strictEqual(customerUpdated.phoneNumber, options.phoneNumber);
assert.strictEqual(customerUpdated.address.toString(), options.address.toString());
assert.strictEqual(customerUpdated.joinedAt.toISOString(), options.joinedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a customer", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("customerAddress").Model.findByIdAndDelete(customerAddressCreated._id);;

      const customerDeleted = await thisService.Model.findByIdAndDelete(customerCreated._id);
      assert.strictEqual(customerDeleted._id.toString(), customerCreated._id.toString());
    });
  });
});