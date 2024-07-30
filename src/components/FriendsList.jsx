import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendsList = ({ friends, userId, onSelectFriend }) => {
  // const [friendId, setFriendId] = useState(null);
  // handleClick function to retrieve history
  // get friend's id, then get chat history
  const handleClick = async (name) => {
    try {
      console.log('clicked: ', name);
      const { data } = await axios.post('http://localhost:3001/api/getUserId', {
        username: name,
      });
      // setFriendId(data);
      console.log('Friend ID from frontend: ', data);
      onSelectFriend(data);
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

  // const [friends, setFriends] = useState([
  //   {
  //     id: 1,
  //     name: 'Alice',
  //     url: 'https://pngimg.com/uploads/snoopy/snoopy_PNG22.png',
  //   },
  //   {
  //     id: 2,
  //     name: 'Bob',
  //     url: 'https://pngimg.com/uploads/snoopy/snoopy_PNG22.png',
  //   },
  //   {
  //     id: 3,
  //     name: 'Charlie',
  //     url: 'https://pngimg.com/uploads/snoopy/snoopy_PNG22.png',
  //   },
  //   {
  //     id: 4,
  //     name: 'Suli',
  //     url: 'https://pngimg.com/uploads/snoopy/snoopy_PNG22.png',
  //   },
  // ]);

  // console.log(user);

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
        <h1>Freinds List</h1>
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
