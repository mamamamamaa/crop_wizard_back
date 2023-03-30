const httpError = require("./httpError");

const validationBody = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      next(httpError(400, error.message));
      return;
    }
    next();
  };
};

module.exports = validationBody;
