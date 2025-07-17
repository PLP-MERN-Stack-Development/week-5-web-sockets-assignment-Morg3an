import { useState } from 'react';

const MessageInput = ({ onSend, onTyping }) => {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setMessage(value);
        onTyping?.(value.length > 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSend(message);
        setMessage('');
        onTyping(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-2 border-t">
            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleChange}
                onBlur={() => onTyping(false)}
                className="flex-1 p-2 border rounded"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Send
            </button>
        </form>
    );
};

export default MessageInput;