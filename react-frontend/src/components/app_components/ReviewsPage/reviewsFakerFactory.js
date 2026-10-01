
import { faker } from "@faker-js/faker";
export default (user,count,customerNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerName: customerNameIds[i % customerNameIds.length],
rating: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
isVerified: faker.lorem.sentence(1),
status: "Not Reviewed",

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
