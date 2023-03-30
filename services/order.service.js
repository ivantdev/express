const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize");

class OrderService {
  async create(data) {
    const order = await models.Order.create(data);
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
