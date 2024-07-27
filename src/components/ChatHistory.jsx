import React, { useEffect } from 'react';

// const ChatHistory = ({ user }) => {
const ChatHistory = ({ user }) => {
  //   const user = { name: 'stephany' };
  console.log(user);

  if (!user) {
    return <div></div>;
  }

  // render friend's list and messages

  return (
    <div>
      <h1>User: {user.user_metadata.username}</h1>
      <h1>Chat History</h1>
      <form action="" method="POST">
        <label htmlFor="friends">Choose a friend:</label>
        <select name="friends" id="friends">
          <option value=""></option>
        </select>
      </form>
      <button>Search</button>
      <br />
      <br />
      <div className="msgHistory_container">Entries</div>
    </div>
  );
};

export default ChatHistory;
