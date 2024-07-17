const User = require("../modules/user");

const RestrictToAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .send({ message: "Please login", redirectUrl: "/E-commerce/login" });
    }

    const admin = await User.findOne({ email: user.email });

    if (!admin || admin.role !== "ADMIN" || user.role !== "ADMIN") {
      return res.status(403).send({
        message: "You don't have permission to access this resource",
        redirectUrl: "/E-commerce/login",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred. Please try again later." });
  }
};

module.exports = RestrictToAdmin;
