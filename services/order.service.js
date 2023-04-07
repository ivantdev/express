const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize");
const sequelize = require("../libs/sequelize");

class OrderService {
  async create(userId) {
    const order = await models.Order.create({
      customerId: sequelize.literal(`(SELECT id FROM customers WHERE user_id = ${userId})`),
    });
    return order;
  }

  async addItem(data) {
    const orderProduct = await models.OrderProduct.create(data);
    return orderProduct;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findByUserId(id) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user_id$': id
      },
      include: [{
          association: "customer",
          include: ["user"],
        },
        "items"
      ],
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
          association: "customer",
          include: ["user"],
        },
        "items"
      ],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const res = await order.update(changes);
    return res;
  }

  async delete(id) {
    const order = await this.findOne(id);
    const res = await order.destroy();
    return res;
  }
}

module.exports = OrderService;
