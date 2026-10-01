
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
variantName: faker.lorem.sentence(1),
sku: faker.lorem.sentence(1),
stockType: faker.lorem.sentence(1),
stockQuantity: faker.lorem.sentence(1),
reservedQuantity: faker.lorem.sentence(1),
availableQuantity: faker.lorem.sentence(1),
updatedAt: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
