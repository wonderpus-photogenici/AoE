import React from "react";
import profPic from "../../Assets/aoelogo2.png";
import leagueLogo from "../../Assets/leagueLogo.png";
import valorantLogo from "../../Assets/valorantLogo.png";

const ProfileTop = () => {
  return (
    <div className="profile-top">
    <div className="profile-top-container">
      <img className="home-logo" src={profPic} alt="profile pic" />
      <div className="username-addBtn-messageBtn">
        <h1 className="profile-username">Username</h1>
        <button className="profileBtn">Add</button>
        <button className="profileBtn">Message</button>
      </div>
      <div className="location-gamelogos">
        <h2 className="location">NA, West</h2>
        <div className="game-logos">
          <img src={valorantLogo} alt="Valorant Logo" />
          <img src={leagueLogo} alt="League Logo" />
        </div>
      </div>
    </div>
  </div>
  );
};
export default ProfileTop;
