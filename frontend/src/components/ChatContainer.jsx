import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import MessageSkeleton from './skeletons/MessageSkeleton.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import avatar from '../assets/avatar.png';
import { formatMessageTime } from '../lib/utils.js';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  },[selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    if(messageEndRef.current && messages){
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  },[messages]);

  if(isMessagesLoading) {
    return (
      <div className='flex flex-1 flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />
      
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key = {message._id}
            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
            ref={messageEndRef}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img 
                  src= {message.senderId === authUser._id ? authUser.profilePic || avatar : selectedUser.profilePic || avatar}
                  alt="profile pic" 
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div className='chat-bubble flex flex-col'>
              {message.image && (
                <img 
                  src={message.image}
                  alt='Attachment'
                  className='sm:max-w-[200px rounded-md mb-2 h-40 w-40'
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}

      </div>


      <MessageInput />
    </div>
  )
}

export default ChatContainer
