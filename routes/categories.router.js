const express = require("express");
const passport = require("passport");
const categoryService = require("../services/categories.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
} = require("../schemas/category.schema");
const checkRoles = require("../middlewares/auth.handler");

const service = new categoryService();
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get("/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const category = await service.findOne(parseInt(id));
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("customer", "admin"),
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const category = await service.update(parseInt(id), body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const category = await service.findOne(parseInt(id));
      await service.delete(category);
      res.json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
