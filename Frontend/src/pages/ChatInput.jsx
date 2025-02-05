import React, { useState } from 'react';

function ChatInput({ socket, selectedGroup, selectedUser }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() === '') return;
  
    const messageData = {
      sender: localStorage.getItem('username'),
      message: message,
      group: selectedGroup,
      receiver: selectedUser,
    };
    if (selectedUser) {
      delete messageData.group; 
    } else {
      delete messageData.receiver; 
    }
  
    socket.emit('chat_message', messageData);
    setMessage('');
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Enter A Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatInput;
