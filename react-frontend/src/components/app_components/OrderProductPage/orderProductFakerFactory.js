
import { faker } from "@faker-js/faker";
export default (user,count,customerNameIds,unitPriceIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerName: customerNameIds[i % customerNameIds.length],
quantity: faker.lorem.sentence(1),
unitPrice: unitPriceIds[i % unitPriceIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
