const TypingIndicator = ({ typingUsers = [] }) => {
  if (typingUsers.length === 0) return null;

  return (
    <div className="px-4 py-2 text-sm text-gray-500">
      {typingUsers.length > 0 && (
        <p>
          {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
        </p>
      )}
    </div>
  );
};

export default TypingIndicator;