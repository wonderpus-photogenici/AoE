import React, { useState } from 'react';
import profPicFiller from '../../Assets/aoelogo3_kyler.png';
// import profPicFiller from '../Assets/aoelogo2.png';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UserRec = (props) => {
  const { username, pfp, bio, allgames, id, isFriend } = props;
  const navigate = useNavigate();
  const CDNURL =
    'https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/';

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/addFriendById',
        { userId: props.userId, friendId: id }
      );
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
        {isFriend ? (
          <button
            className="userRec-Button"
            style={{ backgroundColor: '#fd5c63' }}
            onClick={handleRemoveFriend}
          >
            Remove
          </button>
        ) : (
          <button
            className="userRec-Button"
            style={{ backgroundColor: '#17B169' }}
            onClick={handleAddFriend}
          >
            Add
          </button>
        )}
      </div>
      <div className="userRec-favorite-game">Favorite Game:</div>
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
