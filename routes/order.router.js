const express = require("express");
const router = express.Router();
const validatorHandler = require("../middlewares/validator.handler");
const {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  addItemSchema,
} = require("../schemas/order.schema");

const orderService = require("../services/order.service");
const service = new orderService();

router.get("/",
  async (req, res) => {
    const orders = await service.find();
    res.json(orders);
  }
);

router.get("/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    const body = req.body;

    try {
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/items",
  validatorHandler(addItemSchema, "body"),
  async (req, res, next) => {
    const body = req.body;

    try {
      const newOrder = await service.addItem(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id",
  validatorHandler(getOrderSchema, "params"),
  validatorHandler(updateOrderSchema, "body"),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const order = await service.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id",
  validatorHandler(getOrderSchema),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const order = await service.delete(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
