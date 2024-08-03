import React, { useState } from 'react';
import profPicFiller from '../../Assets/aoelogo3_kyler.png';
// import profPicFiller from '../Assets/aoelogo2.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserRec = (props) => {
  const {
    username,
    pfp,
    bio,
    languages,
    allgames,
    id,
    user,
    isFriend: initialIsFriend,
  } = props;

  let languagesString = languages.join(', ');

  const navigate = useNavigate();
  const CDNURL =
    'https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/';

  const [isFriend, setIsFriend] = useState(initialIsFriend);

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/addFriendById',
        { userId: props.userId, friendId: id }
      );
      if (response.data.success) {
        setIsFriend(true);
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
        setIsFriend(false);
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
        {id === props.userId ? (
          <button
            className="userRec-Button"
            style={{ backgroundColor: '#7CB9E8' }}
          >
            User
          </button>
        ) : isFriend ? (
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

      <textarea
        readOnly
        className="userRec-favorite-game"
        defaultValue={`Languages: ` + languagesString}
      ></textarea>
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
