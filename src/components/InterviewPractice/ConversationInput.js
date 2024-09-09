import React from 'react';

const ConversationInput = ({ onSend }) => {
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <div className="flex gap-2">
      <textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..." 
        className="flex-grow resize-none p-2 border border-gray-300 rounded"
      />
      <button 
        onClick={handleSend}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Send
      </button>
    </div>
  );
};

export default ConversationInput;
