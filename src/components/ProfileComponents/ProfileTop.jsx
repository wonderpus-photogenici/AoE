/*import React from "react";
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
*/

import React from "react";
import noPfp from "../../Assets/noPfp.png";
import leagueLogo from "../../Assets/leagueLogo.png";
import valorantLogo from "../../Assets/valorantLogo.png";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileTop = () => {
    const supabase = useSupabaseClient();
    const [images, setImages] = useState([]);
    const [username, setUsername] = useState(""); // Initialize username state
    const [user, setUser] = useState(null); // Initialize user state
    const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUser(null);
            setUsername("");
        }
    }

    const getUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error("Error fetching user data:", error);
            return;
        }
        if (data && data.user) {
            console.log("User Data:", data.user); // Log the user data
            console.log("User Metadata:", data.user.user_metadata); // Log user metadata
            setUser(data.user);
            setUsername(data.user.user_metadata?.username || "No Username");
        } else {
            console.error("No user data found");
        }
    }

    async function getImages() {
        if (!user) {
            return;
        }
        const { data, error } = await supabase
            .storage
            .from('AoE')
            .list(user.id + "/pfp", {
                limit: 1,
                offset: 0,
                sortBy: { column: "name", order: "asc" }
            });

        if (data) {
            setImages(data);
        } else {
            alert("Error loading images");
            console.error("Error loading images:", error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getImages();
        }
    }, [user]);

    const navigate = useNavigate();

    return (
        <div className="profile-top">
            <div className="profile-top-container">
                {user != null ? (
                    <>
                        <img className="home-logo" src={CDNURL + user.id + "/pfp"} alt="profile pic" />
                    </>
                ) : (
                    <img className="home-logo" src={noPfp} alt="profile pic" />
                )}
                <div className="username-addBtn-messageBtn">
                    <h1 className="profile-username">{username}</h1> {/* Dynamically render username */}
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
                        <button type="button" className="HomeTopRightMessages profileTopHomeBtn" onClick={() => {
                            navigate('/home');
                        }}>Home</button>
                        <button type="button" className="HomeTopRightMessages profileTopLogBtn" onClick={() => {
                            signOut();
                            navigate('/');
                        }}>Logout</button>
                    </div>
                    <div className="location">
                        <h3>Location: </h3>
                        <input type="text" name="profileLocationInput" id="profileLocationInput" className="profileInput"></input>
                    </div>
                    <div className="contactInfo">
                        <h3>Email: </h3>
                        <input type="text" name="profileEmailInput" id="profileEmailInput" className="profileInput"></input>
                    </div>
                    <div className="languages">
                        <h3>Languages:</h3>
                        <input type="text" name="profileLanguagesInput" id="profileLanguagesInput" className="profileInput"></input>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProfileTop;