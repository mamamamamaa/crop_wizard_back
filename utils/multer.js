const multer = require("multer");

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log(req);
  },
});

module.exports = upload;
