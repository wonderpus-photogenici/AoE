import React, { useState } from 'react';
import profPicFiller from '../../Assets/aoelogo3_kyler.png';
// import profPicFiller from '../Assets/aoelogo2.png';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UserRec = (props) => {
  const { username, pfp, bio, languages, allgames, id, user } = props;
  let languagesString = languages.join(', ');


  // const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const CDNURL =
    'https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/';

  // const handleAddFriend = () => {
  //   console.log('userId: ', props.userId); // OK!
  //   console.log('clicked friend ID: ', id); // OK!

  const handleAddFriend = async () => {
    console.log('userId: ', props.userId);
    console.log('friendId: ', id);
    try {
      const response = await axios.post(
        'http://localhost:3001/api/addFriendById',
        { userId: props.userId, friendId: id }
      );
      // console.log('handleAddFriend response: ', response.data.message);
      if (response.data.success) {
        alert('Friend added suucessfully!');
      } else {
        alert('User is already a friend!');
      }
    } catch (err) {
      console.error('Error in adding friend: ', err);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/removeFriendById',
        { userId: props.userId, friendId: id }
      );
      if (response.data.success) {
        alert('Friend removed successfully!');
      } else {
        alert('Failed, user is not your friend!');
      }
    } catch (err) {
      console.error('Error in removing friend: ', err);
    }
  };

  return (
    <div className="userRec-wrapper">
      <img className="userRec-prof-pic" src={CDNURL + pfp} alt="" />

      <div className="userRec-userInfo">
        <span
          className="userRec-username"
          onClick={(e) => {
            navigate(`/profile/${username}`);
          }}
          style={{ cursor: 'pointer' }}
        >
          {username}
        </span>
      </div>

      <div className="userRec-buttons">
        <button className="userRec-Button" onClick={handleAddFriend}>
          Add
        </button>
        {/* <button className="userRec-Button2">Message</button> */}
        <button className="userRec-Button2" onClick={handleRemoveFriend}>
          Remove
        </button>
      </div>
      <textarea readOnly className="userRec-favorite-game" defaultValue={`Languages: ` + languagesString}>
      </textarea>
      <div className="userRecBioWrapper">
        <div className="userRecBioTag">Bio:</div>
        <div className="userRec-game-rank-Container">
          {bio}
          {/* Games: {allgames} */}
        </div>
      </div>
    </div>
  );
};

export default UserRec;
