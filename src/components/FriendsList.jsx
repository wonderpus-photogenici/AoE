import React from 'react';
import axios from 'axios';
import "../pages/Chat.css"

const FriendsList = ({ friends, onSelectFriend }) => {
  // get friend's id, then pass back to Message.jsx to get Chat Hist

  const handleClick = async (name) => {
    try {
      console.log('clicked: ', name);
      const { data } = await axios.post('http://localhost:3001/api/getUserId', {
        username: name,
      });
      // setFriendId(data);
      console.log('Friend ID from frontend: ', data);
      onSelectFriend(data, name);
    } catch (err) {
      console.error("Error getting friend's ID: ", err);
    }
  };

  if (!friends) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <div className="chatMenuWrapper">
        <div className ="chatMenuContainer">
        <h1>Freinds List</h1>
        <div className="chatMenuInputBox">
          <input placeholder="Search for Friends" className="chatMenuInput" />
        </div>
        <ul className="friendsList">
          {friends.map((friend) => (
            <li className="conversation"
              key={friend.username}
              onClick={() => handleClick(friend.username)}
            >
              <img className="conversationImg"/> 
              <span className="conversationName">{friend.username}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
};

export default FriendsList;