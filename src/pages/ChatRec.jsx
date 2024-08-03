import React from 'react'
import './Chat.css';
import noPfp from '../Assets/noPfp.png';

export default function ChatRec({msg, index, own}) {
    console.log('msg', msg, index)
    console.log('own here', own)

    const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/"

  return (
    <div className={own ? "messageHistory own": "messageHistory"} key={index}>
        <div className = "chatbox-top">
            <img src= {msg.pfp ? CDNURL + msg.pfp : 'url(' + noPfp +')'}  placeholder = "users pfp" className="chatUserPic"/>
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
