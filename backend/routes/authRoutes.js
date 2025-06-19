// backend/routes/authRoutes.js (New Version)
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// @desc    Register a new user
// @route   POST /api/auth/register
router.post('/register', registerUser);

// @desc    Authenticate a user and get token
// @route   POST /api/auth/login
router.post('/login', loginUser); // New login route

module.exports = router;
