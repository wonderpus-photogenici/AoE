import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import FriendsList from '../components/FriendsList.jsx';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import ChatHistory from '../components/ChatHistory.jsx';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const activityRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    // get current user data from supabase
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

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
    <div
      style={{ color: 'white', fontSize: '1rem', display: 'flex', gap: '5rem' }}
    >
      {/* <FriendsList user={user} /> */}
      <FriendsList />
      <div>
        <h1>WebSocket Connection Test</h1>
        <form onSubmit={sendMessage}>
          <input type="text" ref={inputRef} onChange={handleInputChange} />
          <button type="submit">Send</button>
        </form>
        <div className="message-container">
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
        </div>
      </div>
      <ChatHistory user={user} />
    </div>
  );

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
