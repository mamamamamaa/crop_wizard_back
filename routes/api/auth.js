const express = require("express");
const { validationBody, authenticate } = require("../../middlewares");
const { loginSchema, registerSchema } = require("../../schemas/authSchemas");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/login", validationBody(loginSchema), ctrl.login);
router.post("/register", validationBody(registerSchema), ctrl.register);
router.get("/current", authenticate, (req, res) => {
  res.json({ message: "super" });
});
router.get("/logout", () => {});

module.exports = router;
