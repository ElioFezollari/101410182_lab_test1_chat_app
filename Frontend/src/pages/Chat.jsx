import React from 'react'
import SideChat from './SideChat'
import ChatBody from './ChatBody'

function Chat() {
  return (
    <div className='chat-wrapper'>
        <SideChat/>
        <ChatBody/>
    </div>
  )
}

export default Chat