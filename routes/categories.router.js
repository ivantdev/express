const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    categories: [
      {
        id: 1,
        name: "Categoria 1",
      },
      {
        id: 2,
        name: "Categoria 2",
      },
    ],
  });
});

router.get("/:id/products", (req, res) => {
  const { id } = req.params;
  res.json({
    products: [
      {
        id: 1,
        name: `Producto 1 de la categoria ${id}`,
      },
      {
        id: 2,
        name: `Producto 2 de la categoria ${id}`,
      },
    ],
  });
});

module.exports = router;
