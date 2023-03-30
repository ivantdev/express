const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(3).max(100);
const image = Joi.string().uri();
const price = Joi.number().precision(2).min(100);
const stock = Joi.number().integer().min(0);
const categoryId = Joi.number().integer();
const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  image: image.required(),
  price: price.required(),
  stock: stock.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  image: image,
  price: price,
  stock: stock,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required()
});

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
