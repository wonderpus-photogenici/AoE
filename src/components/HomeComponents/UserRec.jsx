import React from 'react'
import leagueLogo from '../../Assets/leagueLogo.png';
import leagueDiamond from '../../Assets/leagueDiamond.png';
import profPicFiller from '../../Assets/aoelogo3_kyler.png';
// import profPicFiller from '../Assets/aoelogo2.png';

const UserRec = () => {
  return (
    <div className="userRec-wrapper">

        <img className="userRec-prof-pic" src={profPicFiller} alt="" />
    
      <div className="userRec-userInfo">
        <h2 className="userRec-username">FelValencia</h2>
        <h4 className="userRec-hours">1.2k Hours</h4>
      </div>

      <div className="userRec-buttons">
        <button className="userRec-Button">Add</button>
        <button className="userRec-Button">Message</button>
      </div>

      <div className="userRec-game-rank-Container">

          <img className="userRec-gameLogo" src={leagueLogo} alt="League" />
        <div className="userRec-rank">
          <img className="userRec-gameRank" src={leagueDiamond} alt="League" />
          <h5 className="userRec-rankName">Diamond</h5>
        </div>
      </div>

    </div>
  )
}

export default UserRec