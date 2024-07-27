import React from 'react';

// const FriendsList = ({ user }) => {
const FriendsList = () => {
  // console.log('Friends page:', user);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div>
        {/* <h2>{user.user_metadata.username}</h2> */}
        <ul className="friendsList" style={{}}>
          <li>Friend 1</li>
          <li>Friend 2</li>
          <li>Friend 3</li>
          <li>Friend 4</li>
          <li>Frined 5</li>
        </ul>
      </div>
    </>
  );
};

export default FriendsList;
