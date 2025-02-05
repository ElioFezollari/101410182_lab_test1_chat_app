import React from 'react'
import ChatInput from './ChatInput'
import ChatContent from './ChatContent'

function ChatBody() {
  return (
    <div className="chat-body">
        <div className='chat-header'>Chat Group Title</div>
        <ChatContent/>
        <ChatInput/>
    </div>
  )
}

export default ChatBody