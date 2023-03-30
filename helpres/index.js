const regex = require("./regex");
const ctrlWallpaper = require("./ctrlWallpaper");
const tokens = require("./token");
const sendMail = require("./sendMail");
const verificationMessage = require("./verificationMessage");

module.exports = {
  ...regex,
  ...tokens,
  sendMail,
  verificationMessage,
  ctrlWallpaper,
};
