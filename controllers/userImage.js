const { ctrlWallpaper } = require("../helpres");
const { httpError } = require("../middlewares");
const { cloudinary } = require("../utils");
const { Image } = require("../models/userImage");
const addImage = async (req, res, next) => {
  if (!req.file) {
    next(httpError(404, "File not found"));
    return;
  }

  const { path, originalname } = req.file;
  const { _id: owner } = req.user;

  const { public_id, secure_url } = await cloudinary.uploader.upload(path);

  const result = await Image.create(
    {
      url: secure_url,
      fileName: originalname,
      publicId: public_id,
      owner,
    },
    "-createdAt"
  );

  res.status(201).json(result);
};

const getAllUserImages = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit } = req.query;

  const skip = (page - 1) * limit;

  const result = await Image.find({ owner }, "-createdAt", {
    skip,
    limit,
  }).populate("owner", "username email");
  res.json(result);
};

module.exports = {
  addImage: ctrlWallpaper(addImage),
  getAllUserImages: ctrlWallpaper(getAllUserImages),
};
