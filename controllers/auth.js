const bcrypt = require("bcryptjs");

const { User } = require("../models/user");
const { httpError } = require("../middlewares");
const { ctrlWallpaper, verificationMessage, sendMail } = require("../helpres");
const { generateAccessToken } = require("../helpres/token");

const { EXPIRES_IN, CLIENT_URL } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    next(httpError(409, "Invalid email or password"));
    return;
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    next(httpError(409, "Invalid email or password"));
    return;
  }

  if (!user.verify) {
    next(httpError(409, "Verify your account"));
    return;
  }

  const accessToken = generateAccessToken(user);

  await User.findByIdAndUpdate({ _id: user._id }, { accessToken });

  res.status(200).json({
    username: user.username,
    email: user.email,
    accessToken,
    expiresIn: EXPIRES_IN,
  });
};

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    next(httpError(409, "Email in use"));
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const { verificationToken, verifyMessage } = verificationMessage(email);
  await sendMail.send(verifyMessage);

  await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  res.status(201).json({
    message: "Verify your account by email",
    email,
  });
};

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    next(httpError(404, "User not found"));
    return;
  }

  await User.findByIdAndUpdate(
    { _id: user._id },
    { verificationToken: null, verify: true }
  );

  res.redirect(CLIENT_URL);
};

const current = async (req, res) => {
  const { email, username } = req.user;

  res.status(200).json({ email, username });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate({ _id }, { accessToken: null });

  res.status(200).json({ message: "Success" });
};

module.exports = {
  login: ctrlWallpaper(login),
  register: ctrlWallpaper(register),
  current: ctrlWallpaper(current),
  logout: ctrlWallpaper(logout),
  verify: ctrlWallpaper(verify),
};
