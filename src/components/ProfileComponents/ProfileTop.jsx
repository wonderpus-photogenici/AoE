import React from "react";
import noPfp from "../../Assets/noPfp.png";
import leagueLogo from "../../Assets/leagueLogo.png";
import valorantLogo from "../../Assets/valorantLogo.png";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileTop = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [images, setImages] = useState([]);

  const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";
  // CDNURL + user.id + "/" + image.name

  // const [imgLink, setImgLink] = useState([]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
  }

  async function getImages() {
    const { data, error } = await supabase
      .storage
      .from('AoE')
      .list(user?.id + "/pfp", {
        limit: 1,
        offset: 0,
        sortBy: { column: "name", order: "asc" }
      });
    if (data !== null) {
      setImages(data);
    } else {
      alert("Error loading images")
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    if (user) {
      getImages();
    }
  }, []);

  const locationsArray = ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina']

  // console.log('user: ', user)
  const navigate = useNavigate();

  return (
    <div className="profile-top">
      <div className="profile-top-container">
        {user !== null ?
          <>
            <img className="home-logo" src={CDNURL + user.id + "/pfp"} alt="profile pic" />
          </> : <>
            <img className="home-logo" src={noPfp} alt="profile pic" />
          </>
        }
        <div className="username-addBtn-messageBtn">
          <h1 className="profile-username">Username</h1>
          <button className="profileBtn">Add</button>
          <button className="profileBtn">Message</button>
          <div className="game-logos">
            <img src={valorantLogo} alt="Valorant Logo" />
            <img src={leagueLogo} alt="League Logo" />
          </div>
        </div>
        <textarea className="profileTopBio" placeholder="Describe yourself here..."></textarea>
        <div className="location-gamelogos">
          <div className="profileTopNavBtns">
            <button type='button' className="HomeTopRightMessages profileTopHomeBtn" onClick={() => {
              navigate('/home')
            }}>Home</button>
            <button type='button' className="HomeTopRightMessages profileTopLogBtn" onClick={() => {
              signOut();
              navigate('/')
            }}>Logout</button>
          </div>
          <div className="location">
            <h3>Location: </h3>
          </div>
          <div className="contactInfo">
            <h3>Email: </h3>
            <input type="text" name="profileLocationInput" id = "profileLocationInput" className="profileLocationInput"></input>
          </div>
          <div className="languages">
            <h3>Languages:</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileTop;
