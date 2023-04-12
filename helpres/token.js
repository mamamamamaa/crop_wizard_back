const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY, EXPIRES_IN } = process.env;

const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
  };

  return jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: EXPIRES_IN,
  });
};

module.exports = { generateAccessToken };
