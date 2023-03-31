const multer = require("multer");
const { httpError } = require("../middlewares");

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const [type, extension] = file.mimetype.split("/");

    if (type !== "image") {
      cb(httpError(415, "Invalid type of file"), false);
      return;
    }

    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
});

module.exports = upload;
