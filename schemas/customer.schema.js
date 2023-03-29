const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3);
const phone = Joi.string().min(3);
const email = Joi.string().email();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: Joi.string().min(6).required(),
  }).required(),

});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
