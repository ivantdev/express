const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize");

class CustomerService {
  constructor() {}

  async find() {
    const customers = await models.Customer.findAll({
      include: ["user"]
    });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound("Customer not found");
    }
    return customer;
  }

  async create(data) {
    const newUser = await models.User.create(data.user);
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id,
    });
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const res = await customer.update(changes);
    return res;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    const res = await customer.destroy();
    return res;
  }
}

module.exports = CustomerService;
