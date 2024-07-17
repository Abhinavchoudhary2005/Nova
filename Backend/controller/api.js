const Banner = require("../modules/banner");
const Product = require("../modules/product");

const displayProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.send("server error...");
  }
};

const displayBanner = async (req, res) => {
  try {
    const banners = await Banner.find({});
    res.send(banners);
  } catch (err) {
    res.send("server error...");
  }
};

module.exports = { displayProduct, displayBanner };
