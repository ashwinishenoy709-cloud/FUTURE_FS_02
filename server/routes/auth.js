const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

// @route  POST /api/auth/register
// @desc   Create the first and only admin account
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are all required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Allow registration only if no admin exists yet
    const adminExists = await User.exists({ role: "admin" });

    if (adminExists) {
      return res.status(403).json({
        message: "Admin account already exists. Please sign in.",
      });
    }

    const existing = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existing) {
      return res.status(409).json({
        message: "An account with that email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    res.status(500).json({
      message: "Could not create account",
      error: err.message,
    });
  }
});

// @route  POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user._id);
    res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// @route GET /api/auth/setup-status
// @desc Check whether the admin account has already been created
router.get("/setup-status", async (req, res) => {
  try {
    const adminExists = await User.exists({ role: "admin" });

    res.json({
      registrationAllowed: !adminExists,
    });
  } catch (err) {
    res.status(500).json({
      message: "Could not check setup status",
    });
  }
});


// @route  GET /api/auth/me
router.get("/me", protect, async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

module.exports = router;
