const express = require("express");

const ctrl = require("../../controllers/auth");
const { validationBody, authenticate } = require("../../middlewares");
const { loginSchema, registerSchema } = require("../../schemas/authSchemas");

const router = express.Router();

router.post("/login", validationBody(loginSchema), ctrl.login);
router.post("/register", validationBody(registerSchema), ctrl.register);

router.get("/current", authenticate, ctrl.current);
router.get("/logout", authenticate, ctrl.logout);

router.get("/verify/:verificationToken", ctrl.verify);

module.exports = router;
