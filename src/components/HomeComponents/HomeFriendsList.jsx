import { useUser } from '@supabase/auth-helpers-react';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import noPfp from '../../Assets/noPfp.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRemoveFriendHomeFriendsList } from '../../redux/removeFriendHomeFriendsListSlice';
import { clearRemoveFriendHomeFriendsList } from '../../redux/removeFriendHomeFriendsListSlice';


const HomeFriendsList = () => {
    const user = useUser();
    const [userId, setUserId] = useState(null);
    const [friends, setFriends] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // set addFriend to the value of the redux state at homeFriendsList
    const addFriend = useSelector((state) => state.homeFriendsList);
    const removeFriend = useSelector((state) => state.removeFriendHomeFriendsList);
    // Once addFriend is set, and if the redux state at homeFriendsList changes:
    useEffect(() => {
        if (addFriend) {
            // update the friends to add the new friend
            setFriends([...friends, addFriend.homeFriendsList]);
        }
    }, [addFriend]);

    useEffect(() => {
        if (removeFriend) {
            // getting all objects from friends that do not have the username of the friend that was just removed
            const newFriends = friends.filter((obj) => {
                const usernameFilter = !obj.username.includes(removeFriend.removeFriendHomeFriendsList.username);
                return usernameFilter;
            });

            // setting friends as the new friends array without the removed friend
            setFriends(newFriends);
        }
    }, [removeFriend]);

    // Fetch user ID once user is set
    useEffect(() => {
        const getUserId = async (username) => {
            try {
                const { data } = await axios.post(
                    'http://localhost:3001/api/getUserId',
                    { username }
                );

                setUserId(data);
            } catch (err) {
                console.error('Error in fetching user ID: ', err);
            }
        };

        if (user) {
            getUserId(user.user_metadata.username);
        }
    }, [user]);

    // Fetch friends list w/ pictures once userId is set
    useEffect(() => {
        const getFriendsList = async (userId) => {
            try {
                const { data } = await axios.post(
                    'http://localhost:3001/api/getFriendsList',
                    { userId }
                );
                setFriends(data);
            } catch (err) {
                console.error('Error in fetching friends list: ', err);
            }
        };

        if (userId) {
            getFriendsList(userId);
        }
    }, [userId]);

    const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";

    const handleRemoveFriendById = async (friendId, friendUsername) => {
        try {

            console.log('friend Id in hRFBID: ', friendId);
            console.log('friend username in hRFBID: '. friendUsername);
          const response = await axios.post(
            'http://localhost:3001/api/removeFriendById',
            { userId, friendId }
          );
          if (response.data.success) {
            dispatch(setRemoveFriendHomeFriendsList({username: friendUsername}));
            alert('Friend removed successfully!');
          } else {
            alert('Failed, user is not your friend!');
          }
        } catch (err) {
          console.error('Error in removing friend: ', err);
        }
      };

    // console.log('friends before return', friends);

    return (
        <div className="HomeFriendsListWrapper">
            {friends.map((friend) => (
                <div key={'home: ' + friend.username} className="homeDropdown">
                    <div className="homeRightSideBar" onContextMenu={(e) => {
                        e.preventDefault();
                        if (document.getElementById(`home: ` + friend.username).style.display === 'grid') {
                            document.getElementById(`home: ` + friend.username).style.display = 'none';
                        } else {
                            document.getElementById(`home: ` + friend.username).style.display = 'grid';
                        }
                    }}>
                        <img className="homeRightSideBarIcon" src={CDNURL + friend.pfp} alt={'url(' + noPfp + ')'} />
                        <div className="homeRightSideBarContent">
                            <div>{friend.username}</div>
                        </div>
                    </div>
                    <div id={'home: ' + friend.username} className="homeDrop">
                        <div className="homeDropProfile" onClick={() => {
                            navigate(`/profile/${friend.username}`);
                        }}> Profile </div>
                        <div className="homeDropRemove" onClick={() => {
                            handleRemoveFriendById(friend.id, friend.username)}}> Remove </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HomeFriendsList;