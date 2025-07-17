const Message = require('../models/Message');
const User = require('../models/User'); // Import User model
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const users = {}; // In-memory map of socket.id -> user
const typingUsers = {};

module.exports = (io, socket) => {
    console.log(`User connected: ${socket.id}`);

    const token = socket.handshake.auth?.token;
    let userData = null;

    if (token) {
        try {
            userData = jwt.verify(token, process.env.JWT_SECRET);
            users[socket.id] = {
                username: userData.username,
                id: socket.id,
                userId: userData.id,
            };

            // Update user as online in DB
            User.findByIdAndUpdate(userData.id, {
                online: true,
                socketId: socket.id,
            });

        } catch (err) {
            console.error('Invalid token:', err.message);
            socket.disconnect();
            return;
        }
    } else {
        console.error('No token provided');
        socket.disconnect();
        return;
    }

    io.emit('user_list', Object.values(users));
    io.emit('user_joined', {
        username: userData.username,
        id: socket.id,
    });
    console.log(`${userData.username} joined the chat`);

    // Handle public message
    socket.on('send_message', async (messageData) => {
        try {
            const user = users[socket.id];

            const savedMessage = await Message.create({
                sender: new mongoose.Types.ObjectId(user.userId),
                senderId: socket.id,
                message: messageData.message,
                isPrivate: false,
            });

            const emitMessage = {
                ...messageData,
                id: savedMessage._id,
                sender: user.username,
                senderId: socket.id,
                timestamp: savedMessage.timestamp,
            };

            io.emit('receive_message', emitMessage);
        } catch (err) {
            console.error('Error saving message:', err.message);
        }
    });

    // Handle typing indicator
    socket.on('typing', (isTyping) => {
        const username = users[socket.id]?.username;
        if (!username) return;

        if (isTyping) {
            typingUsers[socket.id] = username;
        } else {
            delete typingUsers[socket.id];
        }

        io.emit('typing_users', Object.values(typingUsers));
    });

    // Handle private message
    socket.on('private_message', async ({ to, message }) => {
        try {
            const sender = users[socket.id];

            const savedMessage = await Message.create({
                sender: new mongoose.Types.ObjectId(sender.userId),
                senderId: socket.id,
                receiverId: to,
                message,
                isPrivate: true,
            });

            const emitMessage = {
                id: savedMessage._id,
                sender: sender.username,
                senderId: socket.id,
                message,
                timestamp: savedMessage.timestamp,
                isPrivate: true,
            };

            socket.to(to).emit('private_message', emitMessage);
            socket.emit('private_message', emitMessage);
        } catch (err) {
            console.error('Error saving private message:', err.message);
        }
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
        const disconnectedUser = users[socket.id];

        if (disconnectedUser) {
            io.emit('user_left', {
                username: disconnectedUser.username,
                id: socket.id,
            });

            console.log(`${disconnectedUser.username} left the chat`);

            // Mark user as offline in DB
            await User.findByIdAndUpdate(disconnectedUser.userId, {
                online: false,
                socketId: '',
            });
        }

        delete users[socket.id];
        delete typingUsers[socket.id];

        io.emit('user_list', Object.values(users));
        io.emit('typing_users', Object.values(typingUsers));
    });
};