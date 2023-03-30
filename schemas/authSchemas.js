const Joi = require("joi");
const { passwordRegex, emailRegex } = require("../helpres/regex");

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

module.exports = { loginSchema, registerSchema };
