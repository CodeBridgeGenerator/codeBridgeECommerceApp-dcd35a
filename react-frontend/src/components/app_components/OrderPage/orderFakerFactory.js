
import { faker } from "@faker-js/faker";
export default (user,count,customerNameIds,emailContactIds,phoneContactIds,couponIds,discountIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
orderNumber: faker.lorem.sentence(1),
customerName: customerNameIds[i % customerNameIds.length],
emailContact: emailContactIds[i % emailContactIds.length],
phoneContact: phoneContactIds[i % phoneContactIds.length],
subtotal: faker.lorem.sentence(1),
coupon: couponIds[i % couponIds.length],
discount: discountIds[i % discountIds.length],
shippingFee: faker.lorem.sentence(1),
placedOrderDate: faker.lorem.sentence(1),
tax: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
