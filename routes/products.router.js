const express = require("express");

const productsService = require("../services/products.service");
const service = new productsService();

const router = express.Router();

router.get("/", (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.post("/", (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "Producto actualizado",
    data: body,
    id,
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "Producto actualizado parcialmente",
    data: body,
    id,
  });
});

module.exports = router;
