import React, { useEffect, useState } from 'react';

function ChatContent({ socket,selectedGroup,selectedUser }) {
  const [messages, setMessages] = useState([]);

  const username = localStorage.getItem('username');

  useEffect(() => {
    if (socket) {
      socket.on('chat_message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.off('chat_message');
      };
    }
  }, [socket]);

  return (
    <div className="chat-content">
      {messages.map((msg, index) => (

        msg.sender === username ? (
          <div key={index} className="message-right">
            <p><strong>{msg.sender}: </strong>{msg.message}</p>
          </div>
        ) : (
          <div key={index} className="message">
            <p><strong>{msg.sender}: </strong>{msg.message}</p>
          </div>
        )
      ))}
    </div>
  );
}

export default ChatContent;
