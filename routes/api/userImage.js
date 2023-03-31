const express = require("express");
const { upload } = require("../../utils");

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  res.json({ message: "good" });
});
router.get("/", () => "get list of images");
router.delete("/", () => "delete image");

module.exports = router;
