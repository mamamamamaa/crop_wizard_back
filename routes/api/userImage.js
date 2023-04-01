const express = require("express");
const { upload } = require("../../utils");
const { addImage } = require("../../controllers/userImage");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/", authenticate, upload.single("image"), addImage);
router.get("/", authenticate, () => "get list of images");
router.delete("/:id", authenticate, () => "delete image");

module.exports = router;