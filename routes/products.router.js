const express = require("express");

const productsService = require("../services/products.service");
const service = new productsService();

const validatorHandler = require("../middlewares/validator.handler");
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require("../schemas/product.schema");

const router = express.Router();

router.get("/",
  validatorHandler(queryProductSchema, "query"),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch(error) {
      next(error);
    }
  }
);

router.get("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const product = await service.findOne(id);
      res.json(product);
    } catch(error) {
      next(error);
    }
  }
);

router.post("/",
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    const body = req.body;

    try {
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      res = await service.update(id, body);
      res.json(res);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const product = await service.update(id, body);
      res.json(product);
    } catch(error) {
      next(error);
    }
  }
);

router.delete("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const product = await service.delete(id);
      res.json(product);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
