
import { faker } from "@faker-js/faker";
export default (user,count,customerNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
orderNumber: faker.lorem.sentence(1),
customerName: customerNameIds[i % customerNameIds.length],
paymentNumber: faker.lorem.sentence(1),
status: "Processing",
placedOrderDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
