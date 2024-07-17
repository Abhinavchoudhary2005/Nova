const express = require("express");
const { addToCart, getCart, removeProduct } = require("../controller/cart");

const router = express.Router();

router.route("/").get(getCart);
router.route("/addToCart").post(addToCart);
router.route("/removeProduct").post(removeProduct);

module.exports = router;
