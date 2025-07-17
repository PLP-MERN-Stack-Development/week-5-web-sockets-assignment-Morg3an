import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../socket/socket';
import { useAuth } from '../hooks/useAuth';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import UserList from './UserList';
import TypingIndicator from './TypingIndicator';

const ChatWindow = () => {
    const {
        messages,
        users,
        typingUsers,
        sendMessage,
        sendPrivateMessage,
        setTyping,
        connect,
    } = useSocket();

    const { user, token } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);
    const messagesEndRef = useRef(null);

    // Connect on auth
    useEffect(() => {
        if (user && token) {
            connect(user.username, token);
        }
    }, [user, token, connect]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle message submission
    const handleSend = (text) => {
        if (!text.trim()) return;

        if (selectedUser) {
            sendPrivateMessage(selectedUser.id, text);
        } else {
            sendMessage(text);
        }

        setTyping(false);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r p-4">
                <UserList users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                <button
                    className="mt-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => setSelectedUser(null)}
                >
                    Public Chat
                </button>
            </aside>

            {/* Main Chat */}
            <main className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                    <MessageList messages={messages} />
                    <div ref={messagesEndRef} />
                </div>

                {/* Typing indicator */}
                <TypingIndicator typingUsers={typingUsers} />

                {/* Message Input */}
                <MessageInput onSend={handleSend} onTyping={setTyping} />
            </main>
        </div>
    );
};

export default ChatWindow;