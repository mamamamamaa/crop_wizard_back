const express = require("express");
const ctrl = require("../../controllers/auth");
const { validationBody, authenticate, passport } = require("../../middlewares");
const { loginSchema, registerSchema } = require("../../schemas/authSchemas");

const router = express.Router();

router.post("/login", validationBody(loginSchema), ctrl.login);
router.post("/register", validationBody(registerSchema), ctrl.register);

router.get("/current", authenticate, ctrl.current);
router.get("/logout", authenticate, ctrl.logout);

router.get("/verify/:verificationToken", ctrl.verify);
router.get("/reverify", () => {});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrl.googleAuth
);

module.exports = router;
