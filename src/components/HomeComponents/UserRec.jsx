import React from 'react';
import profPicFiller from '../../Assets/aoelogo3_kyler.png';
// import profPicFiller from '../Assets/aoelogo2.png';
import { useNavigate, Link } from 'react-router-dom';

const UserRec = (props) => {
  const { username, pfp, bio, languages } = props;
  let languagesString = languages.join(', ');


  const navigate = useNavigate();
  const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";
  return (
    <div className="userRec-wrapper">

      <img className="userRec-prof-pic" src={CDNURL + pfp} alt="" />

      <div className="userRec-userInfo">
        <span className="userRec-username" onClick={(e)=>{
          navigate(`/profile/${username}`);
        }}>{username}</span>
      </div>

      <div className="userRec-buttons">
        <button className="userRec-Button">Add</button>
        {/* <button className="userRec-Button2">Message</button> */}
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
  )
}

export default UserRec