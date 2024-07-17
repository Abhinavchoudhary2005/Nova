const Banner = require("../modules/banner");
const Product = require("../modules/product");

const uploadProduct = async (req, res) => {
  try {
    const { name, category, new_price, old_price, available } = req.body;
    await Product.create({
      name,
      image: req.file.filename,
      category,
      new_price,
      old_price,
      available,
    });
    res.status(201).send("Product uploaded successfully");
  } catch (error) {
    res.status(500).send(`Error uploading product: ${error.message}`);
  }
};

const uploadBanner = async (req, res) => {
  try {
    const { name, category } = req.body;
    await Banner.create({
      name,
      image: req.file.filename,
      category,
    });
    res.status(201).send("banner uploaded successfully");
  } catch (error) {
    res.status(500).send(`Error uploading product: ${error.message}`);
  }
};

module.exports = { uploadProduct, uploadBanner };
