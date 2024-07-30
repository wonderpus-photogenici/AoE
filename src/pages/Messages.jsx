import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import FriendsList from '../components/FriendsList.jsx';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import axios from 'axios';
import './Chat.css';

// import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Messages = () => {
  // const user = useUser();
  const supabase = useSupabaseClient();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // to keep track of online users

  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const activityRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  // const [socket, setSocket] = useState(null)
  // Ensure user ID is propertly extracted from user object
  // const userId = user?.id;
  //    console.log('userID', userId, user)
  // const username = user?.user_metadata?.username; // Accessing username
  //     console.log('username', username)
  // console.log('socketRef', socketRef)

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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

  // Fetch user data from Supabase
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setUsername(data.user.user_metadata.username);
    };
    getUser();
  }, [supabase]);

  // Fetch user ID once user is set
  useEffect(() => {
    const getUserId = async (username) => {
      console.log('username:', username);
      try {
        const { data } = await axios.post(
          'http://localhost:3001/api/getUserId',
          { username }
        );
        setUserId(data);
        console.log('User Id from frontend:', data);
      } catch (err) {
        console.error('Error in fetching user ID: ', err);
      }
    };

    if (user) {
      getUserId(user.user_metadata.username);
    }
  }, [user]);

  // Fetch friends list once userId is set
  useEffect(() => {
    const getFriendsList = async (userId) => {
      try {
        const { data } = await axios.post(
          'http://localhost:3001/api/getFriendsList',
          { userId }
        );
        console.log('FriendsList from frontend:', data);
        setFriends(data);
      } catch (err) {
        console.error('Error in fetching friends list: ', err);
      }
    };

    if (userId) {
      getFriendsList(userId);
    }
  }, [userId]);

  // Setup WebSocket connection
  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    //Emit user info when connected
    if (userId) {
      socket.emit('addUser', { id: userId, username });
    }

    //Handle incoming users list
    socket.on('getUsers', (users) => {
      setOnlineUsers(users); // Update the list of online users
    });

    return () => {
      socket.disconnect();
      clearTimeout(typingTimeoutRef.current);
      console.log('Socket disconnected');
    };
  }, [userId, username]);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      console.log('Socket ID:', socket.id);
    });

    socket.on('message', (message) => {
      clearTimeout(typingTimeoutRef.current);
      if (activityRef.current) {
        activityRef.current.textContent = '';
      }
      console.log('Message received: ', message);
      console.log('Messages object: ', messages);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('activity', (name) => {
      if (activityRef.current) {
        activityRef.current.textContent = `${name} is typing...`;
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          if (activityRef.current) {
            activityRef.current.textContent = '';
          }
        }, 2000); // Clear after 2 seconds of inactivity
      }
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

  // Handle keypress activity
  const handleInputChange = () => {
    if (socketRef.current) {
      socketRef.current.emit('activity', username);
    }
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();

    // const message = inputRef.current.value;
    // if (message) {
    //   socketRef.current.emit('message', message); // Emit the message

    const messageText = inputRef.current.value;
    if (messageText && socketRef.current) {
      const message = { text: messageText, username };
      socketRef.current.emit('message', message); // emit the message

      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  // fetch chat history when userId and selectedFriendId are set
  const getChatHistory = async (userId, selectedFriendId) => {
    if (!userId || !selectedFriendId) return;
    try {
      console.log(
        `Fetching chat history of user ${userId} and friend ${selectedFriendId}`
      );
      const { data } = await axios.post(
        'http://localhost:3001/api/getChatHistory',
        {
          userId,
          selectedFriendId,
        }
      );
      // setMessages(data);
      console.log('chat history: ', data);
    } catch (err) {
      console.error('Error in fetching chat history: ', err);
    }
  };

  // useEffect(() => {
  //   if (userId && selectedFriendId) {
  //     getChatHistory(userId, selectedFriendId);
  //   }
  // }, [userId, selectedFriendId]);

  // start chat with another friend
  const handleFriendSelect = (friendId) => {
    setSelectedFriendId(friendId);
    getChatHistory(userId, friendId);
  };

  return (
    <div className="message-page">
      <FriendsList
        className="friend-list"
        style={{ width: '100px', padding: '10px' }}
        friends={friends}
        userId={userId}
        onSelectFriend={handleFriendSelect}
      />
      <div className="chatBox">
        <h1>Game Tonight</h1>
        {selectedFriendId ? (
          <div
            className="message-container"
            style={{ flex: '5.5', gap: '5px' }}
          >
            <ul style={{ gap: '5px' }}>
              {messages.map((msg, index) => (
                <li
                  key={index}
                  style={{ border: '1px, solid, white', height: '30px' }}
                >
                  <strong>{msg.username}</strong>:{msg.text}{' '}
                  <span style={{ color: 'grey', fontSize: 'small' }}>
                    ({msg.timestamp})
                  </span>
                </li>
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
        ) : (
          <p>Choose a friend to chat!</p>
        )}
      </div>
      <div className="chat-online" style={{ flex: '3.5', gap: '5px' }}>
        Online Friends:
        <ul>
          {onlineUsers.map((user) => (
            <li key={user.id}>{user.name}</li> // Display user names from the list of online users
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Messages;
