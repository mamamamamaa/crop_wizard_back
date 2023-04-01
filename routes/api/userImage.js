const express = require("express");
const { upload } = require("../../utils");
const ctrl = require("../../controllers/userImage");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/", authenticate, upload.single("image"), ctrl.addImage);
router.get("/", authenticate, ctrl.getAllUserImages);
router.delete("/:id", authenticate, ctrl.deleteUserImage);

module.exports = router;
