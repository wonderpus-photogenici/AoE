import React, {useState} from 'react';
import axios from 'axios';
import "../pages/Chat.css"
import noPfp from '../Assets/noPfp.png';
import add from '../Assets/add-large.png';
import subtract from "../Assets/subtract.png"
import video from "../Assets/video-white.png"
import edit from "../Assets/pencil-white.png"
import more from "../Assets/more-white.png"
import search from "../Assets/search.png"

const FriendsList = ({ friends, onSelectFriend, friendPicture, userPicture, username}) => {
  // get friend's id, then pass back to Message.jsx to get Chat Hist
const [addMode, setAddMode]= useState(false)


const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/"



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
      <div className="chatMenuWrapper">
        <div className ="chatMenuContainer">
        <div className ="userInfo">
          <div className="user">
            <img src ={CDNURL + userPicture} alt="user-profile"/>
            <h2>{username}</h2>
          </div>
          <div className="icons">
          <img src={more} alt="more" className="icon"/>
          <img src={video} alt="video" className="icon"/>
          <img src={edit} alt="edit" className="icon"/>
          </div>
        </div>
        <div className="chatMenuInputBox">
          <div className="searchBar">
          <img src={search} alt="search" className="icon" />
          <input placeholder="Search" className="chatMenuInput" />
          </div>
          <img src={addMode ? subtract:add} alt="add" className="add" onClick={()=> setAddMode((prev)=>!prev)}/>
        </div>
        <ul className="friendsList">
          {friends.map((friend) => (
            <li className="conversation"
              key={friend.username}
              onClick={() => handleClick(friend.username)}
            >
              <img className="conversationImg" src={friendPicture ? CDNURL + friendPicture : 'url(' + noPfp +')'}/> 
              <span className="conversationName">{friend.username}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
};

export default FriendsList;