const jwt = require("jsonwebtoken");

const { httpError } = require("./index");
const { User } = require("../models/user");

const { ACCESS_SECRET_KEY } = process.env;
const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(httpError(401));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.accessToken) {
      next(httpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(httpError(401));
  }
};

module.exports = authenticate;
