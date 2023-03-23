const { faker } = require("@faker-js/faker");

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for(let i = 0; i < 100; i++) {
      this.products.push({
        id: i+1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
      });
    }
  }

  create() {

  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((product) => product.id === id);
  }

  delete() {

  }
}

module.exports = ProductsServices;
