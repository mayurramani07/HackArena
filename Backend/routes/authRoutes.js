const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { register, login, checkAuth, logout } = require("../controllers/authController");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/check", authMiddleware, checkAuth);
router.post("/logout", authMiddleware, logout);

module.exports = router;
