const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

// @desc    Register a user with email and password
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    console.log('Incoming registration payload:', req.body);
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            user: { id: newUser._id, username: newUser.username, email: newUser.email },
            token,
        });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// @desc    Login with email and password
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({
            user: { id: user._id, username: user.username, email: user.email },
            token,
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Login failed' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = (req, res) => {
    const user = req.user; // User is set by verifyToken middleware
    res.json({
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    });
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    // Invalidate the token on the client side
    // Here we can also implement token blacklisting if needed
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
};