const express = require("express");
const multer = require("multer");
const { uploadProduct, uploadBanner } = require("../controller/upload");
const { removeProduct, removeBanner } = require("../controller/remove");
const { userIsAuth } = require("../controller/userIsAuth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadMulter = multer({ storage });

const router = express.Router();

router.route("/").get(userIsAuth);
router
  .route("/upload/product")
  .post(uploadMulter.single("image"), uploadProduct);
router.route("/upload/banner").post(uploadMulter.single("image"), uploadBanner);
router.route("/remove/product").post(removeProduct);
router.route("/remove/banner").post(removeBanner);

module.exports = router;
