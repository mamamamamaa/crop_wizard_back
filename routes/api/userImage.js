const express = require("express");
const { upload } = require("../../utils");
const { addImage } = require("../../controllers/userImage");

const router = express.Router();

router.post("/", upload.single("image"), addImage);
router.get("/", () => "get list of images");
router.delete("/", () => "delete image");

module.exports = router;
