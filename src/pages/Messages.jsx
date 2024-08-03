import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import FriendsList from '../components/FriendsList.jsx';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import axios from 'axios';
import './Chat.css';
import ChatRec from './ChatRec.jsx'
// import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { CgScrollV } from "react-icons/cg";
import { send } from 'process';
import phone from '../Assets/phone.png';
import video from '../Assets/video-white.png';
import info from '../Assets/information-fill.png';
import emoji from '../Assets/emoji.png';
import chatBackground from '../Assets/summoner.png'
import image from '../Assets/image.png';
import camera from '../Assets/camera.png';
import mic from '../Assets/mic.png';
import HomeTopRight from '../components/HomeComponents/HomeTopRight.jsx'
import MessageTopRight from '../components/MessageTopRight.jsx'
import FriendSearchSingle from '../'

const Messages = () => {
  // const user = useUser();
  const supabase = useSupabaseClient();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // to keep track of online user
  const [userPicture, setUserPicture] = useState(null)
  const [friendPicture, setFriendPicture] = useState(null)
  

  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const activityRef = useRef(null);
  const typingTimeoutRef = useRef(null);


  const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/"

  // console.log('selectedFriend? ', selectedFriend)
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

  //getting userPictures
  useEffect(() => {

    const getPfpPath = async (username) => {
      console.log('pfp username', username)

      try {
        const { data } = await axios.post('http://localhost:3001/api/getPfpPath', { username });
        setUserPicture(data)
        console.log('userPicture data', data)
      } catch (error) {
        console.log('error occured from getPfpPath in message.jsx')
      }

    }
    if (username) {
      getPfpPath(username)
    }
  }, [username])


  // Fetch friends list w/ pictures once userId is set
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

    socket.on('message', async (message, username) => {
      clearTimeout(typingTimeoutRef.current);
      if (activityRef.current) {
        activityRef.current.textContent = '';
      }
      //  if(messages.sender === username) setOwn(true)

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

    const messageText = inputRef.current.value;

    if (messageText && socketRef.current) {
      const message = {
        text: messageText,
        username,
        userId,
        selectedFriend,
        selectedFriendId,
      };

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
      setMessages(data);
      console.log('chat history: ', data); // array of objects
    } catch (err) {
      console.error('Error in fetching chat history: ', err);
    }
  };

  // start chat with another friend
  const handleFriendSelect = async (friendId, friendName) => {
    setSelectedFriendId(friendId);
    setSelectedFriend(friendName);
    console.log('friendID', friendId);
    console.log('selected friend', friendName)

    getChatHistory(userId, friendId);

  };

  useEffect(() => {

    const getPfpPath = async (selectedFriend) => {
      console.log('pfp friendname: ', selectedFriend);

      try {
        const { data } = await axios.post('http://localhost:3001/api/getPfpPath', { username: selectedFriend });
        setFriendPicture(data);
        console.log('userPicture data: ', data);
      } catch (error) {
        console.log('error occured from getPfpPath in message.jsx');
      }

    }
    if (selectedFriend) {
      getPfpPath(selectedFriend);
    };
  }, [selectedFriend])

  // console.log('own from message', own)
  // console.log('selected')
  // if (selectedFriendId) {
  //   if (document.getElementById("message-container")) {
  //     if (document.getElementById("message-container").scrollTop) {
  //       let objDiv = document.getElementById("message-container");
  //       objDiv.scrollTop = objDiv.scrollHeight;
  //     }
  //   }
  // }

  return (
    <div className= "background" style={{ backgroundImage:'url(' + chatBackground+ ')'}}>
    <div className="messenger">
      <div className="chatMenu">
      <FriendsList
        friends={friends}
        userId={userId}
        onSelectFriend={handleFriendSelect}
        friendPicture={friendPicture}
        userPicture={userPicture}
        username={username}
      />
      </div>
      <div className="chatBox">
        <div className="chatMenuWrapper">
        <div className="top">
        {selectedFriend && (
        <div className="friendInfo">
        <span className ="chooseFriend" style={{ color: "white" }}>{selectedFriend}</span>
        <div className="icons">
          <img src={phone} alt="phone" className="icon"/>
          <img src={video} alt="video" className="icon"/>
          <img src={info} alt="info" className="icon"/>
        </div>
        </div>
        )}
        </div>
        <div className="middle">
        {selectedFriendId ? (
              <div className="message-container" id="message-container">
                {messages.map((msg, index) => (
                  <ChatRec msg={msg} index={index} own={msg.sender === username} key={index} picture={userPicture} friendPicture={friendPicture} />
                ))}
                <p
                  className="activity"
                  ref={activityRef}
                ></p>
              </div>

            ) : (
              <p className="chooseFriend" style={{ color: "white" }}>Choose a friend to chat!</p>
            )}
        </div>
            <div className="bottom">
            {selectedFriendId ? (
              <form onSubmit={sendMessage} className="inputBox">
              <div className="icons">
                 <img src={image} alt="image" className="icon"/>
                <img src={camera} alt="camera" className="icon"/>
                <img src={mic} alt="mic" className="icon"/>
              </div>
                <input className="chatInput" type="text" ref={inputRef} onChange={handleInputChange} placeholder="Type here.." />
                <div className="emoji">
                  <img src={emoji} alt="emoji" className="icon" />
                </div>
                <button type="submit" className="messageSend">Send</button>
              </form>)
             : <>
              < p style={{ color: "white" }}>...loading</p>
            </>}
          </div>
            </div>
        </div>
        <div className="chat-online" >
        <div className="navBar">
          {/* <HomeTopRight /> */}
          <MessageTopRight />
        </div>
          <div className="chatOnlineWrapper">
            <h1 style={{ color: "white" }}>Online Friends:</h1>
            <ul>
              {onlineUsers.map((user) => (
                <li className="onlineList" key={user.id}>
                  <p>{user.name}</p>
               </li> // Display user names from the list of online users
              ))}
            </ul>
         
          </div>
        </div>
      </div>
    </div >
  );
};

export default Messages;