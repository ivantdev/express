const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const config = require("../config/config");

router.post("/login",
  passport.authenticate("local", { session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwt_secret, {
        expiresIn: "1h",
      });

      return res.json({ token, user });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
