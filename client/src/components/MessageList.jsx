import { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`mb-2 ${msg.system ? 'text-gray-500 italic' : ''}`}>
                    <strong>{msg.sender || 'System'}:</strong>{' '}
                    <span>{msg.message}</span>
                    <span className="text-xs text-gray-400 ml-2">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;