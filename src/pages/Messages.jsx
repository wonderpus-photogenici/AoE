import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import FriendsList from '../components/FriendsList.jsx';

const Messages = () => {
  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <h1>WebSocket Connection Test</h1>

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
  );
};

export default Messages;
