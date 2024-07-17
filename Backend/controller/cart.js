const User = require("../modules/user");

const addToCart = async (req, res) => {
  const {
    _id,
    image,
    name,
    old_price,
    new_price,
    category,
    size: selectedSize,
  } = req.body;

  if (
    !_id ||
    !image ||
    !name ||
    !old_price ||
    !new_price ||
    !category ||
    !selectedSize
  ) {
    return res.status(400).send({ error: "All product fields are required." });
  }

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    let productExists = false;

    for (let i = 0; i < user.cart.length; i++) {
      const item = user.cart[i];

      if (
        item._id.toString() === _id.toString() &&
        item.size.trim().toLowerCase() === selectedSize.trim().toLowerCase()
      ) {
        user.cart.set(i, {
          ...user.cart[i],
          quantity: user.cart[i].quantity + 1,
          totalPrice: (user.cart[i].quantity + 1) * new_price,
        });
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      const product = {
        _id,
        image,
        name,
        old_price,
        new_price,
        category,
        size: selectedSize,
        quantity: 1,
        totalPrice: new_price,
      };

      user.cart.push(product);
    }

    let totalCartValue = user.cart.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    user.set({ totalCartValue });

    const savedUser = await user.save();

    res.status(200).send({
      message: "Item added to cart successfully",
      cart: savedUser.cart,
    });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).send({
      error: "An error occurred while adding the item to cart.",
      details: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res
      .status(200)
      .send({ cart: user.cart, totalCartValue: user.totalCartValue });
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while fetching the cart.",
      details: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  const { _id, size } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    let index = -1;

    for (let i = 0; i < user.cart.length; i++) {
      const item = user.cart[i];

      if (
        item._id.toString() === _id.toString() &&
        item.size.trim().toLowerCase() === size.trim().toLowerCase()
      ) {
        user.cart.set(i, {
          ...user.cart[i],
          quantity: user.cart[i].quantity - 1,
          totalPrice: (user.cart[i].quantity - 1) * item.new_price,
        });

        if (user.cart[i].quantity === 0) {
          user.cart.splice(i, 1);
        }

        index = i;
        break;
      }
    }

    if (index === -1) {
      return res.status(404).send({ error: "Product not found in cart." });
    }

    let totalCartValue = user.cart.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    user.set({ totalCartValue });

    const savedUser = await user.save();

    res.status(200).send({
      quantity: index !== -1 ? savedUser.cart[index]?.quantity || 0 : 0,
    });
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while removing the product.",
      details: error.message,
    });
  }
};

module.exports = { addToCart, getCart, removeProduct };
