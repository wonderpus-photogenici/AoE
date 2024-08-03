import React from 'react';
import axios from 'axios';

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
      <div
        className="conversation"
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'top',
          padding: '10px',
        }}
      >
        <h1>Friends List</h1>
        <div className="searchBar">
          <input placeholder="Search for Friends" className="chatMenuInput" />
        </div>
        <ul
          className="friendsList"
          style={{
            color: 'yellow',
            listStyle: 'none',
            justifyContent: 'flex-start',
            alignContent: 'center',
          }}
        >
          {friends.map((friend) => (
            <li
              key={friend.username}
              style={{
                fontSize: '15px',
                cursor: 'pointer',
                border: 'solid 1px white',
              }}
              onClick={() => handleClick(friend.username)}
            >
              <img
                className="conversationImg"
                // src={friend.url}
                style={{
                  height: '50px',
                  width: '50px',
                  background: 'white',
                  borderRadius: '50%',
                  marginRight: '20px',
                  objectFit: 'cover',
                }}
              />
              <span className="conversationName">{friend.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendsList;
