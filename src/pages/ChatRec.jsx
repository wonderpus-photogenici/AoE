import React from 'react'
import './Chat.css';

export default function ChatRec({msg, index, own}) {
    console.log('msg', msg, index)
    console.log('own here', own)

  return (
    <div className={own ? "messageHistory own": "messageHistory"} key={index}>
        <div className = "chatbox-top">
            <img src='https://th.bing.com/th/id/OIP.5TUUOlD14Dc4wqneaqNP5AHaJU?rs=1&pid=ImgDetMain'         placeholder = "users pfp" className="chatUserPic"/>
            <p>{msg.sender}</p>
        </div>
        <div clasName="messagePortion">
            <p className="messageText">{msg.message}</p>
        </div>
        <div classname="chatbox-bottom">
        <p style={{color: 'grey', fontSize:"small"}}>{msg.date_time}</p>
        </div>
    </div>
  )
}
