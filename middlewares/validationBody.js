const { httpError } = require("./");

const validationBody = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
};

module.exports = validationBody;
