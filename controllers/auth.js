const bcrypt = require("bcryptjs");

const { User } = require("../models/user");
const { httpError } = require("../middlewares");
const { ctrlWallpaper } = require("../helpres");
const { generateAccessToken } = require("../helpres/token");

const { EXPIRES_IN } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    next(httpError(409, "Invalid email or password"));
    return;
  }

  if (!user.verify) {
    next(httpError(409, "Verify your account"));
    return;
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    next(httpError(409, "Invalid email or password"));
    return;
  }

  const accessToken = generateAccessToken(user);

  await User.findByIdAndUpdate({ id: user._id }, { accessToken });

  res.status(200).json({
    username: user.username,
    email: user.email,
    accessToken,
    expiresIn: EXPIRES_IN,
  });
};

module.exports = { login: ctrlWallpaper(login) };
