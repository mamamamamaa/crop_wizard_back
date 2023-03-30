const express = require("express");
const { validationBody } = require("../../middlewares");
const { loginSchema, registerSchema } = require("../../schemas/authSchemas");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/login", validationBody(loginSchema), ctrl.login);
router.post("/register", validationBody(registerSchema), ctrl.register);
router.get("/current", () => {});
router.get("/logout", () => {});

module.exports = router;
