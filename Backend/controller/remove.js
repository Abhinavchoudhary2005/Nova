const fs = require("fs");
const path = require("path");
const Banner = require("../modules/banner");
const Product = require("../modules/product");

const deleteImageFile = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(`Failed to delete image file at ${imagePath}:`, err);
    } else {
      console.log(`Image file at ${imagePath} deleted successfully.`);
    }
  });
};

const removeProduct = async (req, res) => {
  const { _id } = req.body;
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    const result = await Product.deleteOne({ _id });
    if (result.deletedCount === 0) {
      res.status(404).send({ error: "Product not found" });
    } else {
      // Delete the associated image file
      const imagePath = path.join(__dirname, "../upload/images", product.image);
      deleteImageFile(imagePath);
      res.status(200).send({ message: "Product deleted successfully" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the product" });
  }
};

const removeBanner = async (req, res) => {
  const { _id } = req.body;
  try {
    const banner = await Banner.findById(_id);
    if (!banner) {
      return res.status(404).send({ error: "Banner not found" });
    }

    const result = await Banner.deleteOne({ _id });
    if (result.deletedCount === 0) {
      res.status(404).send({ error: "Banner not found" });
    } else {
      // Delete the associated image file
      const imagePath = path.join(__dirname, "../upload/images", banner.image);
      deleteImageFile(imagePath);
      res.status(200).send({ message: "Banner deleted successfully" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the banner" });
  }
};

module.exports = { removeProduct, removeBanner };
