const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize");

class ProductsServices {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(queryParams) {
    const options = {
      include: ["category"],
      where: {},
    }
    const { limit, offset } = queryParams;
    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const price = queryParams.price;
    if( price ) {
      options.where.price = price;
    }

    const price_min = queryParams.price_min;
    const price_max = queryParams.price_max;
    if( price_min && price_max ) {
      options.where.price = {
        [Op.between]: [price_min, price_max]
      }
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ["category"],
    });
    if(!product) {
      throw boom.notFound("Product not found");
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const res = await product.update(changes);
    return res;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsServices;
