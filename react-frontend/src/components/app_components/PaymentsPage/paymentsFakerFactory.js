
import { faker } from "@faker-js/faker";
export default (user,count,orderNumberIds,amountIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
paymentNumber: faker.lorem.sentence(1),
orderNumber: orderNumberIds[i % orderNumberIds.length],
paymentMethod: faker.lorem.sentence(1),
amount: amountIds[i % amountIds.length],
paidAt: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
