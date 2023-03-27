const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

const pool = require("../libs/postgres.pool");

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on("error", (err) => console.error("Unexpected error on idle client", err));
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
    const query = "SELECT * FROM tasks";
    const res = await this.pool.query(query);
    return res.rows;
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if(!product) {
      throw boom.notFound("Product not found");
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if(index === -1) {
      throw boom.notFound("Product not found");
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
      throw boom.notFound("Product not found");
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsServices;
