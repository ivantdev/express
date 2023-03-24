const Joi = require("joi");

const idSchema = Joi.string()
  .guid({ version: "uuidv4" });

const nameSchema = Joi.string()
  .alphanum()
  .min(3)
  .max(15);

const priceSchema = Joi.number()
  .integer()
  .min(1);

const createProductSchema = Joi.object({
  name: nameSchema.required(),
  price: priceSchema.required()
});

const updateProductSchema = Joi.object({
  name: nameSchema,
  price: priceSchema
});

const getProductSchema = Joi.object({
  id: idSchema.required()
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
};
