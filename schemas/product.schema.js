const Joi = require("joi");

const idSchema = Joi.string()
  .guid();

const nameSchema = Joi.string()
  .min(3)
  .max(15);

const priceSchema = Joi.number()
  .integer()
  .min(100);

const imageSchema = Joi.string()
  .uri();

const createProductSchema = Joi.object({
  name: nameSchema.required(),
  price: priceSchema.required(),
  image: imageSchema.required()
});

const updateProductSchema = Joi.object({
  name: nameSchema,
  price: priceSchema,
  image: imageSchema
});

const getProductSchema = Joi.object({
  id: idSchema.required()
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
};
