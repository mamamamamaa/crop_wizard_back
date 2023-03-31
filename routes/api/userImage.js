const express = require("express");

const router = express.Router();

router.post("/", () => "add image");
router.get("/", () => "get list of images");
router.delete("/", () => "delete image");

module.exports = router;
