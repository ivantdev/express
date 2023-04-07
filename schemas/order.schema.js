const Joi = require("joi")

const id = Joi.number().integer().positive();
const customerId = Joi.number().integer().positive();

const getOrderSchema = Joi.object({
  id: id.required(),
});

const updateOrderSchema = Joi.object({
  id: id,
  customerId: customerId,
});

const addItemSchema = Joi.object({
  orderId: id.required(),
  productId: id.required(),
  quantity: Joi.number().integer().positive().required(),
});

module.exports = {
  getOrderSchema,
  updateOrderSchema,
  addItemSchema,
};
