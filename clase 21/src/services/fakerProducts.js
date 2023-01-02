import { faker } from '@faker-js/faker';
faker.locale = 'es'

export default function generateProduct() {
  return {
    title: faker.commerce.productName(),
    price: faker.random.numeric(5),
    thumbnail: faker.image.business(640, 480, true),
  }
}