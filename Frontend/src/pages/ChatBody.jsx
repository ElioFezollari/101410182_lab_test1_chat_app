import React from 'react'
import ChatInput from './ChatInput'
import ChatContent from './ChatContent'

function ChatBody({selectedGroup,selectedUser,socket}) {

  return (
    <div className="chat-body">
        <div className='chat-header'>{selectedGroup && <p>Messaging In Group: {selectedGroup}</p>}{selectedUser && <p>Messaging User: {selectedUser}</p>}</div>
        <ChatContent socket={socket} selectedGroup={selectedGroup} selectedUser={selectedUser}/>
        <ChatInput socket={socket} selectedGroup={selectedGroup} selectedUser={selectedUser}/>
    </div>
  )
}

export default ChatBody