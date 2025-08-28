const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateAccessToken, verifyToken } = require("../utils/jwt");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: "Strict",
  maxAge: 60 * 60 * 1000, 
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, passwordHash });

    const token = generateAccessToken(newUser._id);

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        success: true,
        user: { id: newUser._id, email: newUser.email },
      });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = generateAccessToken(user._id);

    res
      .cookie("token", token, cookieOptions)
      .json({
        success: true,
        user: { id: user._id, email: user.email },
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, loggedIn: false });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return res.status(401).json({ success: false, loggedIn: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ success: false, loggedIn: false });
    }

    res.json({
      success: true,
      loggedIn: true,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error("CheckAuth error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.logout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
