
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import SideChat from "./SideChat";
import ChatBody from "./ChatBody";
import { useNavigate } from 'react-router';

function Chat() {
  const navigate = useNavigate()
  if(localStorage.getItem('token') === null){
   navigate("/") 
  }
  const [socket, setSocket] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("DevOps");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server with ID:', newSocket.id);
    });

    return () => {
      newSocket.disconnect();
      console.log('Disconnected from socket server');
    };
  }, []);

  useEffect(() => {
    if (socket) {
      if (selectedGroup) {
        socket.emit('join_group', selectedGroup);
        console.log(`${socket.id} joined ${selectedGroup}`);

        return () => {
          socket.emit('leave_group', selectedGroup);
          console.log(`${socket.id} left ${selectedGroup}`);
        };
      }

      if (selectedUser) {
        socket.emit('join_user', selectedUser);
        console.log(`${socket.id} joined DM with ${selectedUser}`);

        return () => {
          socket.emit('leave_user', selectedUser);
          console.log(`${socket.id} left DM with ${selectedUser}`);
        };
      }
    }
  }, [selectedGroup, selectedUser, socket]);

  return (
    <div className="chat-wrapper">
      <SideChat setSelectedGroup={setSelectedGroup} setSelectedUser={setSelectedUser} />
      <ChatBody socket={socket} selectedGroup={selectedGroup} selectedUser={selectedUser} />
    </div>
  );
}

export default Chat;
