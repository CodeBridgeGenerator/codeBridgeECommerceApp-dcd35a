
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
couponName: faker.lorem.sentence(1),
couponCode: faker.lorem.sentence(1),
minimumOrder: faker.lorem.sentence(1),
validUntil: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
