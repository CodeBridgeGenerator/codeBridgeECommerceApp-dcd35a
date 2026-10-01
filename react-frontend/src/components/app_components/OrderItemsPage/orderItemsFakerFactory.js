
import { faker } from "@faker-js/faker";
export default (user,count,orderNumberIds,unitPriceIds,netTotalIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
orderNumber: orderNumberIds[i % orderNumberIds.length],
unitPrice: unitPriceIds[i % unitPriceIds.length],
netTotal: netTotalIds[i % netTotalIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
