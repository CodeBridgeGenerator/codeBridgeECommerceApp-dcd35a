
import { faker } from "@faker-js/faker";
export default (user,count,productsTotalIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
categoryName: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
image: faker.lorem.sentence(1),
showInMenu: "No",
productsTotal: productsTotalIds[i % productsTotalIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
