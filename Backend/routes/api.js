const express = require("express");
const { displayProduct, displayBanner } = require("../controller/api");

const router = express.Router();

router.route("/product").get(displayProduct);
router.route("/banner").get(displayBanner);

module.exports = router;
