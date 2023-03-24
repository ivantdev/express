const { faker } = require("@faker-js/faker");

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for(let i = 0; i < 100; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(product) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    return this.products.find((product) => product.id === id);
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if(index === -1) {
      throw new Error("Product not found");
    }
    this.products[index] = {
      ...this.products[index],
      ...changes,
    }
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if(index === -1) {
      throw new Error("Product not found");
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsServices;
