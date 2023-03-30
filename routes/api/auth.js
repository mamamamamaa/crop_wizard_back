const express = require("express");
const { validationBody } = require("../../middlewares");
const { loginSchema } = require("../../schemas/authSchemas");
const { login } = require("../../controllers/auth");

const router = express.Router();

router.post("/login", validationBody(loginSchema), login);
router.post("/register", () => {});
router.get("/current", () => {});
router.get("/logout", () => {});

module.exports = router;
