import React, { useEffect, useRef, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import FriendsList from '../components/FriendsList.jsx';
import axios from "axios";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import "./Chat.css"

const Messages = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]) // to keep track of online users
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const activityRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  // const [socket, setSocket] = useState(null)
  // Ensure user ID is propertly extracted from user object
  const userId = user?.id;
     console.log('userID', userId, user)
  const username = user?.user_metadata?.username; // Accessing username
      console.log('username', username)
    // console.log('socketRef', socketRef)

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
  };

  // getting current user's information with authentication
  // useEffect(() => {
  // getUser();
  // },[user])

  // getting username 
  // useEffect(() => {
  //   (async () => {
  //     const { data, error } = await axios.get('http://localhost:3001/api/getProfData', {
  //       id: userId
  //     });
  //     console.log('data: ', data);
  
  //   })});


  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    //Emit user info when connected
    if(userId) {
    socket.emit("addUser", { id: userId, username })
    }

    //Handle incoming users list
    socket.on("getUsers", users => {
      setOnlineUsers(users);// Update the list of online users
    })

    return () => {
      socket.disconnect();
      clearTimeout(typingTimeoutRef.current);
      console.log('Socket disconnected');
    }
  }, [userId, username]);


    useEffect(() => {
      const socket = io('http://localhost:3001');
      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        console.log('Socket ID:', socket.id);
      })

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

    // socket.on('disconnect', () => {
    //   console.log('Disconnected from WebSocket server');
    // });

    return () => {
      socket.disconnect();
      clearTimeout(typingTimeoutRef.current);
      console.log('Socket disconnected');
    };
  }, []);

  // the 'keypress' event
  const handleInputChange = () => {
    if(socketRef.current) {
    socketRef.current.emit('activity', username);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const messageText = inputRef.current.value;
    if (messageText && socketRef.current) {
      const message = { text: messageText, username };
      socketRef.current.emit('message', message); // emit the message
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div className = "message-page">
      <FriendsList className = "friend-list" style = {{ width: "100px", padding:"10px"}} />
      <div className = "chatBox">
        <h1>Game Tonight</h1>

        <div className="message-container" style = {{ flex: "5.5", gap:"5px"}}>
          <ul style = {{gap: '5px'}}>
            {messages.map((msg, index) => (
              <li key={index} style ={{border:'1px, solid, white', height: '30px'}}>
                <strong>{msg.username}</strong>:{msg.text} <span style={{ color: 'grey', fontSize: 'small'}}>({msg.timestamp})</span></li>
            ))}
          </ul>
          <p
            className="activity"
            ref={activityRef}
            style={{ color: 'pink' }}
          ></p>

          <form onSubmit={sendMessage}>
          <input type="text" ref={inputRef} onChange={handleInputChange} />
          <button type="submit">Send</button>
        </form>
        </div>
      </div>
      <div className = "chat-online" style = {{ flex: "3.5", gap:"5px"}}>
            Online Friends:
            <ul>
              {onlineUsers.map(user => (
                <li key={user.id}>{user.name}</li> // Display user names from the list of online users
              ))}
            </ul>
      </div>
    </div>
  );
}

export default Messages;