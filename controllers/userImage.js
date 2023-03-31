const { ctrlWallpaper } = require("../helpres");
const addImage = async (req, res, next) => {
  console.log("here");
};

module.exports = {
  addImage: ctrlWallpaper(addImage),
};
