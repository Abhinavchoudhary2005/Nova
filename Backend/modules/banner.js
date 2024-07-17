const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Banner = mongoose.model("banners", bannerSchema);

module.exports = Banner;
