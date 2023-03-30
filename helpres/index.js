const regex = require("./regex");
const tokens = require("./token");
const sendMail = require("./sendMail");
const ctrlWallpaper = require("./ctrlWallpaper");
const verificationMessage = require("./verificationMessage");

module.exports = {
  ...regex,
  ...tokens,
  sendMail,
  verificationMessage,
  ctrlWallpaper,
};
