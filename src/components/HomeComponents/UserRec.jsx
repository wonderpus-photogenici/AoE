import React from 'react'
import leagueLogo from '../../Assets/leagueLogo.png';
import leagueDiamond from '../../Assets/leagueDiamond.png';
import profPicFiller from '../../Assets/aoelogo3_kyler.png';
// import profPicFiller from '../Assets/aoelogo2.png';

const UserRec = (props) => {
  const { username, pfp, allgames } = props;
  // console.log('username: ', username);
  // console.log('allgames: ', allgames);
  const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";
  return (
    <div className="userRec-wrapper">

      <img className="userRec-prof-pic" src={CDNURL + pfp} alt="" />

      <div className="userRec-userInfo">
        <h2 className="userRec-username">{username}</h2>
      </div>

      <div className="userRec-buttons">
        <button className="userRec-Button">Add</button>
        <button className="userRec-Button">Message</button>
      </div>
      <div className="userRec-favorite-game">
        Favorite Game:
      </div>
      <div className="userRec-game-rank-Container">
        {/* Games: {allgames} */}
        {/* Bio:  */}
        {/* Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test
        Hello this is a spam test */}
      </div>

    </div>
  )
}

export default UserRec