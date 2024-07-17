require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const { checkForAuth } = require("./middleware/auth");
const admin = require("./routes/admin");
const api = require("./routes/api");
const user = require("./routes/user");
const token = require("./routes/token");
const cart = require("./routes/cart");
const RestrictToAdmin = require("./middleware/RestrictToAdmin");

// PORT
const PORT = process.env.PORT || 8000;

// SERVER
const app = express();

// CONNECTING MONGODB SERVER
mongoose
  .connect(process.env.MONGODB_URL, {
    serverSelectionTimeoutMS: 60000,
    family: 4, // Use IPv4
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(checkForAuth);

// ROUTES
app.use("/admin", RestrictToAdmin, admin);
app.use("/images", express.static(path.join(__dirname, "/upload/images")));
app.use("/api", api);
app.use("/user", user);
app.use("/token", token);
app.use("/cart", cart);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// START THE SERVER
const server = app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT} ...`);
});
