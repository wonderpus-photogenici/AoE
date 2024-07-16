import React from 'react'
import leagueLogo from '../Assets/leagueLogo.png';
import leagueDiamond from '../Assets/leagueDiamond.png';
import profPicFiller from '../Assets/aoelogo3_kyler.png';
// import profPicFiller from '../Assets/aoelogo2.png';

const UserRec = () => {
  return (
    <div className="userRec-wrapper">
      <div className="userRec-prof-pic">
        <img src={profPicFiller} alt="" />
      </div>

      <div className="userRec-userInfo">
        <div className="userRec-username">
          FelValencia
        </div>
        <div className="userRec-hours">
          1.2k hr
        </div>
      </div>

      <div className="userRec-buttons">
        <div className="userRec-addButton">
          Add
        </div>
        <div className="userRec-messageBtn">
          Message
        </div>
      </div>

      <div className="userRec-gameContainer">
        <div className="userRec-gameLogo">
          <img src={leagueLogo} alt="League" />
        </div>
        <div className="userRec-game">
          League Of Legends
        </div>
      </div>

      <div className="userRec-rankContainer">
        <div className="userRec-rankLogo">
          <img src={leagueDiamond} alt="League" />
        </div>
        <div className="userRec-rank">
          Diamond
        </div>
      </div>

    </div>
  )
}

export default UserRec