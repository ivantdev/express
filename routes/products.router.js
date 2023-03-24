const express = require("express");

const productsService = require("../services/products.service");
const service = new productsService();

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.json(product);
});

router.post("/", async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "Producto actualizado",
    data: body,
    id,
  });
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const product = await service.update(id, body);
    res.json(product);
  } catch(error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await service.delete(id);
    res.json(product);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
