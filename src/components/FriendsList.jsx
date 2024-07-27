import React, { useState } from 'react';

const FriendsList = () => {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'Alice',
      url: 'https://pngimg.com/uploads/snoopy/snoopy_PNG22.png',
    },
    {
      id: 2,
      name: 'Bob',
      url: 'https://pngimg.com/uploads/snoopy/snoopy_PNG22.png',
    },
    {
      id: 3,
      name: 'Charlie',
      url: 'https://pngimg.com/uploads/snoopy/snoopy_PNG22.png',
    },
    {
      id: 4,
      name: 'Suli',
      url: 'https://pngimg.com/uploads/snoopy/snoopy_PNG22.png',
    },
  ]);

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
              key={friend.id}
              style={{
                fontSize: '15px',
                cursor: 'pointer',
                border: 'solid 1px white',
              }}
            >
              <img
                className="conversationImg"
                src={friend.url}
                style={{
                  height: '50px',
                  width: '50px',
                  background: 'white',
                  borderRadius: '50%',
                  marginRight: '20px',
                  objectFit: 'cover',
                }}
              />
              <span className="conversationName">{friend.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendsList;
