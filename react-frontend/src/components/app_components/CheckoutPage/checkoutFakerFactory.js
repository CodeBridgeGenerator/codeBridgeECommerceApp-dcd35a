
import { faker } from "@faker-js/faker";
export default (user,count,subtotalIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
paymentMethod: faker.lorem.sentence(1),
subtotal: subtotalIds[i % subtotalIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
