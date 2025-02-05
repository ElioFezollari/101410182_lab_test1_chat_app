import React, { useEffect, useState } from 'react';
import { getGroupMessages, getDMessages } from '../services/API'; 

function ChatContent({ socket, selectedGroup, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    // Fetch messages when the group or user changes
    if (selectedGroup) {
      getGroupMessages(selectedGroup)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching group messages:', error);
        });
    } else if (selectedUser) {
      getDMessages(username, selectedUser)
        .then(response => {
          console.log(response)
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching DM messages:', error);
        });
    }

    if (socket) {
      socket.on('chat_message', (data) => {
        if ((selectedGroup && data.group === selectedGroup) || 
            (selectedUser && (data.receiver === selectedUser || data.sender === selectedUser))) {
          setMessages(prevMessages => [...prevMessages, data]);
        }
      });

      return () => {
        socket.off('chat_message');
      };
    }
  }, [selectedGroup, selectedUser, username, socket]);

  return (
    <div className="chat-content">
      {messages.map((msg, index) => (
        (msg.sender === username || msg.from_user === username) ? (
          <div key={index} className="message-right">
            <p><strong>You: </strong>{msg.message}</p>
          </div>
        ) : (
          <div key={index} className="message">
            <p><strong>{msg.sender || msg.from_user }: </strong>{msg.message}</p>
          </div>
        )
      ))}
    </div>
  );
}

export default ChatContent;
