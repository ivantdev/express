const express = require("express");
const categoriesService = require("../services/categories.service");

const service = new categoriesService();
const router = express.Router();

router.get("/", (req, res) => {
  res.json(service.find());
});

router.get("/:id/products", (req, res) => {
  const { id } = req.params;
  res.json(service.findOne(parseInt(id)));
});

module.exports = router;
