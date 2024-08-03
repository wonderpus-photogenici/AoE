import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setHomeFriendsList } from '../../redux/homeFriendsListSlice';
import { setRemoveFriendHomeFriendsList } from '../../redux/removeFriendHomeFriendsListSlice';

const UserRec = (props) => {
  const {
    username,
    pfp,
    bio,
    languages,
    id,
    isFriend: initialIsFriend,
  } = props;

  const dispatch = useDispatch();

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
        dispatch(setHomeFriendsList({ username, pfp, id }));
        setIsFriend(true);
        // alert('Friend added successfully!');
      } else {
        alert('User is already a friend!');
      }
    } catch (err) {
      console.error('Error in adding friend: ', err);
    }
  };

  // const handleRemoveFriend = async () => {
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:3001/api/removeFriendById',
  //       { userId: props.userId, friendId: id }
  //     );
  //     if (response.data.success) {
  //       dispatch(setRemoveFriendHomeFriendsList({ username, friend_id: id }));
  //       setIsFriend(false);
  //       alert('Friend removed successfully!');
  //     } else {
  //       alert('Failed, user is not your friend!');
  //     }
  //   } catch (err) {
  //     console.error('Error in removing friend: ', err);
  //   }
  // };

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
            style={{ backgroundColor: '#fcae1e' }}
          >
            User
          </button>
        ) : isFriend ? (
          <button
            className="userRec-Button"
            style={{ backgroundColor: '#4B9CD3' }}
            // onClick={handleRemoveFriend}
          >
            Friend
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
