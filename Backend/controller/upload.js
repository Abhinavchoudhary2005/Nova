const Product = require("../modules/product");
const Banner = require("../modules/banner");

const uploadProduct = async (req, res) => {
  try {
    const { name, category, newprice, oldprice } = req.body;
    const image = req.file.filename;

    const newProduct = new Product({
      name,
      category,
      new_price: newprice,
      old_price: oldprice,
      image,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product uploaded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: `Error uploading product: ${error.message}`,
      });
  }
};

const uploadBanner = async (req, res) => {
  try {
    const { name, category } = req.body;
    const image = req.file.filename;

    const newBanner = new Banner({
      name,
      category,
      image,
    });

    await newBanner.save();
    res
      .status(201)
      .json({ success: true, message: "Banner uploaded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: `Error uploading banner: ${error.message}`,
      });
  }
};

module.exports = { uploadProduct, uploadBanner };
