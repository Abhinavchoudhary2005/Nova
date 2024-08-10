const express = require("express");
const { login, signUp, googleAuth } = require("../controller/user");

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signUp);
router.route("/googleAuth").post(googleAuth);

module.exports = router;
