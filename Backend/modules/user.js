const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    cart: {
      type: [Object],
      default: [],
    },
    totalCartValue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
