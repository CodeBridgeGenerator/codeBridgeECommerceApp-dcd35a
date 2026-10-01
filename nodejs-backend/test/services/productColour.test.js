const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("productColour service", async () => {
  let thisService;
  let productColourCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("productColour");

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
    assert.ok(thisService, "Registered the service (productColour)");
  });

  describe("#create", () => {
    const options = {"colorName":"new value","colorCode":"new value"};

    beforeEach(async () => {
      productColourCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new productColour", () => {
      assert.strictEqual(productColourCreated.colorName, options.colorName);
assert.strictEqual(productColourCreated.colorCode, options.colorCode);
    });
  });

  describe("#get", () => {
    it("should retrieve a productColour by ID", async () => {
      const retrieved = await thisService.Model.findById(productColourCreated._id);
      assert.strictEqual(retrieved._id.toString(), productColourCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"colorName":"updated value","colorCode":"updated value"};

    it("should update an existing productColour ", async () => {
      const productColourUpdated = await thisService.Model.findByIdAndUpdate(
        productColourCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(productColourUpdated.colorName, options.colorName);
assert.strictEqual(productColourUpdated.colorCode, options.colorCode);
    });
  });

  describe("#delete", async () => {
    it("should delete a productColour", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const productColourDeleted = await thisService.Model.findByIdAndDelete(productColourCreated._id);
      assert.strictEqual(productColourDeleted._id.toString(), productColourCreated._id.toString());
    });
  });
});