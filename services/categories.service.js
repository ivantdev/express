const { faker } = require("@faker-js/faker");

class categoriesServices {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    for(let i = 0; i < 10; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
      });
    }
  }

  create() {
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find((category) => category.id === id);
  }

  delete() {
  }
}

module.exports = categoriesServices;
