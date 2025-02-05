  import React, { useState, useEffect } from 'react';

  function ChatInput({ socket, selectedGroup, selectedUser }) {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

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

      socket?.emit('chat_message', messageData);
      setMessage('');
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      } else if (message === "") {
        setIsTyping(false);
      } else {
        if (!isTyping) {
          setIsTyping(true);
          socket?.emit('typing', {
            sender: localStorage.getItem('username'),
            group: selectedGroup,
            receiver: selectedUser,
          });
        }
      }
    };

    const handleChange = (e) => {
      setMessage(e.target.value);
    };

    useEffect(() => {
      if (!socket) return; 

      socket.on('typing', (data) => {
        if (data.sender) {
          console.log(`${data.sender} is typing...`);
        }
      });

      return () => {
        socket?.off('typing'); 
      };
    }, [socket]); 

    return (
      <div className="chat-input">
        <div>
        {isTyping && <p className='typing'>Is Typing...</p>} 
        <input
          type="text"
          placeholder="Enter A Message"
          value={message}
          onChange={handleChange}
          onKeyUp={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Send</button>
        </div>
        
      </div>
    );
  }

  export default ChatInput;
