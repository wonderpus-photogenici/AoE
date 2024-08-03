import React, { useEffect, useRef, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import FriendsList from '../components/FriendsList.jsx';
// import '../components/message.css'
import axios from "axios";
// need to import auth



const Messages = () => {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const activityRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
//   const [socket, setSocket] = useState(null)


  // using axios.get request to get the friend list. 
  useEffect(() => {
    // logic for getting current friendlist 


  })

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      console.log('Socket ID: ', socket.id);
    });

    socket.on('message', (message) => {
      clearTimeout(typingTimeoutRef.current);
      activityRef.current.textContent = '';
      console.log('Message received: ', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('activity', (name) => {
      activityRef.current.textContent = `${name} is typing...`;
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        activityRef.current.textContent = '';
      }, 2000); // Clear after 2 seconds of inactivity
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
      clearTimeout(typingTimeoutRef.current);
      console.log('Socket disconnected');
    };
  }, []);

  // the 'keypress' event
  const handleInputChange = () => {
    socketRef.current.emit('activity', socketRef.current.id.substring(0, 5));
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const message = inputRef.current.value;
    if (message) {
      socketRef.current.emit('message', message); // emit the message
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div className = "message-page"
      style={{ color: 'white', fontSize: '1rem', display: 'flex', gap: '5rem', height: "100vh" }}
    >
      <FriendsList className = "friend-list" style = {{ width: "100px", padding:"10px"}} />
      <div className = "chatBox">
        <h1>Game Tonight</h1>
        
        <div className="message-container" style = {{ flex: "5.5", gap:"5px"}}>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
          <p
            className="activity"
            ref={activityRef}
            style={{ color: 'red' }}
          ></p>

          <form onSubmit={sendMessage}>
          <input type="text" ref={inputRef} onChange={handleInputChange} />
          <button type="submit">Send</button>
        </form>
        </div>``
      </div>
      <div className = "chat-online" style = {{ flex: "3.5", gap:"5px"}}>
            Online Friends
      </div>
    </div>
  );


// disconnection is not displaying (no sign)



  //   <div
  //     style={{
  //       display: 'flex',
  //       color: 'white',
  //       padding: '5rem 10rem',
  //       gap: '5rem',
  //     }}
  //   >
  //     <FriendsList />
  //     <div>
  //       Messages
  //       <main>
  //         <ul
  //           class="chat-display"
  //           style={{ height: '30rem', width: '30rem', backgroundColor: 'grey' }}
  //         ></ul>

  //         <p class="activity"></p>

  //         <form class="form-msg">
  //           <input
  //             type="text"
  //             id="message"
  //             placeholder="Your message"
  //             required
  //           />
  //           <button type="submit">Send</button>
  //         </form>
  //       </main>
  //     </div>
  //   </div>
};

export default Messages;