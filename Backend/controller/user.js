const bcrypt = require("bcrypt");
const User = require("../modules/user");
const { createTokenForUser } = require("../utils/token");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({
        error:
          "This account was created with Google. Please log in using Google.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password incorrect" });
    }

    const token = createTokenForUser(user);
    res.status(200).json({ uid: token, redirectUrl: "/E-commerce" });
  } catch (error) {
    res.status(500).json({ error: `Error logging in user: ${error.message}` });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      salt,
    });

    const token = createTokenForUser(newUser);
    res.status(201).json({ uid: token, redirectUrl: "/E-commerce" });
  } catch (error) {
    res.status(500).json({ error: `Error creating user: ${error.message}` });
  }
};

const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        user.googleId = googleId;
        await user.save();
      } else {
        user = await User.create({
          googleId,
          email,
          name,
        });
      }
    }

    const authToken = createTokenForUser(user);
    res.status(200).json({ uid: authToken, redirectUrl: "/E-commerce" });
  } catch (error) {
    res.status(401).json({ error: "Google Authentication failed" });
  }
};

module.exports = { login, signUp, googleAuth };
