const regex = require("./regex");
const ctrlWallpaper = require("./ctrlWallpaper");
const { tokens } = require("./token");

module.exports = { ...regex, ctrlWallpaper, ...tokens };
