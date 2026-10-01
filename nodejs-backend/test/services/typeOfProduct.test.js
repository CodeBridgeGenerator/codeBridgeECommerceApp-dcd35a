const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("typeOfProduct service", async () => {
  let thisService;
  let typeOfProductCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("typeOfProduct");

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
    assert.ok(thisService, "Registered the service (typeOfProduct)");
  });

  describe("#create", () => {
    const options = {"productName":"new value","productType":"new value"};

    beforeEach(async () => {
      typeOfProductCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new typeOfProduct", () => {
      assert.strictEqual(typeOfProductCreated.productName, options.productName);
assert.strictEqual(typeOfProductCreated.productType, options.productType);
    });
  });

  describe("#get", () => {
    it("should retrieve a typeOfProduct by ID", async () => {
      const retrieved = await thisService.Model.findById(typeOfProductCreated._id);
      assert.strictEqual(retrieved._id.toString(), typeOfProductCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"productName":"updated value","productType":"updated value"};

    it("should update an existing typeOfProduct ", async () => {
      const typeOfProductUpdated = await thisService.Model.findByIdAndUpdate(
        typeOfProductCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(typeOfProductUpdated.productName, options.productName);
assert.strictEqual(typeOfProductUpdated.productType, options.productType);
    });
  });

  describe("#delete", async () => {
    it("should delete a typeOfProduct", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const typeOfProductDeleted = await thisService.Model.findByIdAndDelete(typeOfProductCreated._id);
      assert.strictEqual(typeOfProductDeleted._id.toString(), typeOfProductCreated._id.toString());
    });
  });
});