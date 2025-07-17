const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', (req, res) => {
    // Handle logout logic here, e.g., invalidate token on client side
    logoutUser(req, res);
});

// Protected route (example)
router.get('/profile', verifyToken, getProfile);

module.exports = router;