import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import FriendsList from '../components/FriendsList.jsx';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const activityRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Use the useSupabaseClient hook to get the Supabase client
  const supabase = useSupabaseClient();

  // Fetch user data from Supabase
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
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

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      console.log('Socket ID: ', socket.id);
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

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
      clearTimeout(typingTimeoutRef.current);
      console.log('Socket disconnected');
    };
  }, []);

  // Handle keypress activity
  const handleInputChange = () => {
    socketRef.current.emit('activity', socketRef.current.id.substring(0, 5));
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();

    const message = inputRef.current.value;
    if (message) {
      socketRef.current.emit('message', message); // Emit the message
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
    <div
      className="message-page"
      style={{
        color: 'white',
        fontSize: '1rem',
        display: 'flex',
        gap: '5rem',
        height: '100vh',
      }}
    >
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
          </div>
        ) : (
          <p>Choose a friend to chat!</p>
        )}
      </div>
      <div className="chat-online" style={{ flex: '3.5', gap: '5px' }}>
        Online Friends
      </div>
      {/* <ChatHistory user={user} /> */}
    </div>
  );
};

export default Messages;
