const express = require("express");
const { faker } = require("@faker-js/faker");

const router = express.Router();

router.get("/", (req, res) => {
  const products = [];
  for(let i = 0; i < 10; i++) {
    products.push({
      id: i+1,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl(),
    });
  }
  res.json({
    products,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: `Producto ${id}`,
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: "Producto creado",
    data: body,
  });
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
