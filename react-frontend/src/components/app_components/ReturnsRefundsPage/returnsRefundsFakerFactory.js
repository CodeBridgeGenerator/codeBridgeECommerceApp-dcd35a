
import { faker } from "@faker-js/faker";
export default (user,count,customerNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
requestNumber: faker.lorem.sentence(1),
requestType: "Return",
customerName: customerNameIds[i % customerNameIds.length],
reason: faker.lorem.sentence(1),
productDetail: faker.lorem.sentence(1),
photos: faker.lorem.sentence(1),
conditon: "Defective",
status: "Approved",
refundMethod: "Replacement",
refundAmount: faker.lorem.sentence(1),
refundRef: faker.lorem.sentence(1),
dateReturn: faker.lorem.sentence(1),
requestedAt: faker.lorem.sentence(1),
refundedAt: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
