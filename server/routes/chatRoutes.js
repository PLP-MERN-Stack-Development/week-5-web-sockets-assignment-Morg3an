const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

// GET /api/messages - get recent messages
router.get('/messages', verifyToken, async (req, res) => {
    try {
        const messages = await Message.find({ isPrivate: false })
            .sort({ timestamp: -1 })
            .limit(100)
            .populate('sender', 'username') // only return username field
            .lean();

        res.json(messages.reverse());
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// GET /api/users - optionally return a static list or load from DB
router.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find({}, 'username _id online'); // include `online`
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = router;