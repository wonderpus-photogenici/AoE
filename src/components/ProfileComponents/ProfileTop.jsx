import React from "react";
import noPfp from "../../Assets/noPfp.png";
import leagueLogo from "../../Assets/leagueLogo.png";
import valorantLogo from "../../Assets/valorantLogo.png";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileTop = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [images, setImages] = useState([]);

  const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";
  // CDNURL + user.id + "/" + image.name

  // const [imgLink, setImgLink] = useState([]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  };

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
  };

  async function getImages() {
    // console.log('in getImages');
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
  };

  async function setGames() {
    const response = await axios.post('http://localhost:3001/api/getUserGames', {
      userId: user.id,
    })
    document.getElementById('gamesplayedListAdd').innerHTML = response.data;
  };

  async function getUserName() {
    const response = await axios.post('http://localhost:3001/api/getUserName', {
      userId: user.id,
    })
    document.getElementById('profile-username').innerHTML = response.data;
  };

  useEffect(() => {
    getUser();
    if (user) {
      getImages();
      // setGames();
    }
  }, []);

  if (user) {
    setGames();
    getUserName();
  };

  const locationsArray = ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina'];
  const gamesArray = ["League of Legends", "Minecraft", "Valorant", "Baldur's Gate 3", "Elden Ring", "Overwatch", "Fortnite", "Apex Legends"]

  const myFunction = () => {
    document.getElementById('profGamesDrop').style.display = 'block';
  };

  window.onclick = function (event) {
    if (document.getElementById('profGamesDropBtn') !== null) {
      if (!event.target.matches('.profGamesDropdown') && !event.target.matches('#profGamesDropBtn') && !event.target.matches('#profGamesInput') && !event.target.matches('#profGamesDrop')) {
        document.getElementById('profGamesDrop').style.display = 'none';
      }
    }
  };

  const profGamesFilter = () => {
    var input, filter, ul, li, adiv, i;
    input = document.getElementById("profGamesInput");
    filter = input.value.toUpperCase();
    let div = document.getElementById("profGamesDrop");
    adiv = div.getElementsByTagName("div");
    for (i = 0; i < adiv.length; i++) {
      let txtValue = adiv[i].textContent || adiv[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        adiv[i].style.display = "";
      } else {
        adiv[i].style.display = "none";
      }
    }
  };

  const addGame = async (game) => {
    if (user) {
      const response = await axios.post('http://localhost:3001/api/addGame', {
        userId: user.id,
        game: game,
      });
      if (response.data) {
        document.getElementById("gamesplayedListAdd").innerHTML = response.data;
      }
    }
  };

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
          <h1 id="profile-username" className="profile-username">Username</h1>
          <button className="profileBtn">Add</button>
          <button className="profileBtn">Message</button>
          <div className="game-logos">
            <img src={valorantLogo} alt="Valorant Logo" />
            <img src={leagueLogo} alt="League Logo" />
          </div>
        </div>
        <textarea className="profileTopBio" placeholder="Describe yourself here..."></textarea>
        <div className="allgames">
          <div className="allgamesWrapper">
            <div>
              Select Games Played:
            </div>
            <div className="profGamesDropdown">
              <button onClick={myFunction} className="profGamesDropdown" id="profGamesDropBtn">Search Games</button>
              <div id="profGamesDrop" className="profGamesDrop">
                <input type="text" placeholder="Search.." id="profGamesInput" onKeyUp={profGamesFilter}></input>
                {/* Just hard coding options for now since short on time */}
                <div onClick={(e) => {
                  addGame(e.target.innerHTML);
                }}>
                  League of Legends
                </div>
                <div onClick={(e) => {
                  addGame(e.target.innerHTML);
                }}>
                  Minecraft
                </div>
                <div onClick={(e) => {
                  addGame(e.target.innerHTML);
                }}>
                  Valorant
                </div>
                <div onClick={(e) => {
                  addGame(e.target.innerHTML);
                }}>
                  Baldur's Gate 3
                </div>
                <div onClick={(e) => {
                  addGame(e.target.innerHTML);
                }}>
                  Elden Ring
                </div>
                <div onClick={(e) => {
                  addGame(e.target.innerHTML);
                }}>
                  Overwatch
                </div>
                <div onClick={(e) => {
                  addGame(e.target.innerHTML);
                }}>
                  Fortnite
                </div>
                <div onClick={(e) => {
                  addGame(e.target.innerHTML);
                }}>
                  Apex Legends
                </div>
              </div>
            </div>
          </div>
        </div>
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
            <input type="text" name="profileLocationInput" id="profileLocationInput" className="profileLocationInput"></input>
          </div>
          <div className="languages">
            <h3>Languages:</h3>
          </div>
          <div className="gamesplayedList">
            <h3>Games:</h3>
            <div id="gamesplayedListAdd" className="gamesplayedListAdd"></div>
          </div>
        </div>
      </div>


    </div>
  );
};
export default ProfileTop;


// import React from "react";
// import noPfp from "../../Assets/noPfp.png";
// import leagueLogo from "../../Assets/leagueLogo.png";
// import valorantLogo from "../../Assets/valorantLogo.png";
// import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProfileTop = () => {
//     const supabase = useSupabaseClient();
//     const [images, setImages] = useState([]);
//     const [username, setUsername] = useState(""); // Initialize username state
//     const [user, setUser] = useState(null); // Initialize user state
//     const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";

//     async function signOut() {
//         const { error } = await supabase.auth.signOut();
//         if (!error) {
//             setUser(null);
//             setUsername("");
//         }
//     }

//     const getUser = async () => {
//         const { data, error } = await supabase.auth.getUser();
//         if (error) {
//             console.error("Error fetching user data:", error);
//             return;
//         }
//         if (data && data.user) {
//             console.log("User Data:", data.user); // Log the user data
//             console.log("User Metadata:", data.user.user_metadata); // Log user metadata
//             setUser(data.user);
//             setUsername(data.user.user_metadata?.username || "No Username");
//         } else {
//             console.error("No user data found");
//         }
//     }

//     async function getImages() {
//         if (!user) {
//             return;
//         }
//         const { data, error } = await supabase
//             .storage
//             .from('AoE')
//             .list(user.id + "/pfp", {
//                 limit: 1,
//                 offset: 0,
//                 sortBy: { column: "name", order: "asc" }
//             });

//         if (data) {
//             setImages(data);
//         } else {
//             alert("Error loading images");
//             console.error("Error loading images:", error);
//         }
//     }

//     useEffect(() => {
//         getUser();
//     }, []);

//     useEffect(() => {
//         if (user) {
//             getImages();
//         }
//     }, [user]);

//     const navigate = useNavigate();

//     return (
//         <div className="profile-top">
//             <div className="profile-top-container">
//                 {user != null ? (
//                     <>
//                         <img className="home-logo" src={CDNURL + user.id + "/pfp"} alt="profile pic" />
//                     </>
//                 ) : (
//                     <img className="home-logo" src={noPfp} alt="profile pic" />
//                 )}
//                 <div className="username-addBtn-messageBtn">
//                     <h1 className="profile-username">{username}</h1> {/* Dynamically render username */}
//                     <button className="profileBtn">Add</button>
//                     <button className="profileBtn">Message</button>
//                     <div className="game-logos">
//                         <img src={valorantLogo} alt="Valorant Logo" />
//                         <img src={leagueLogo} alt="League Logo" />
//                     </div>
//                 </div>
//                 <textarea className="profileTopBio" placeholder="Describe yourself here..."></textarea>
//                 <div className="location-gamelogos">
//                     <div className="profileTopNavBtns">
//                         <button type="button" className="HomeTopRightMessages profileTopHomeBtn" onClick={() => {
//                             navigate('/home');
//                         }}>Home</button>
//                         <button type="button" className="HomeTopRightMessages profileTopLogBtn" onClick={() => {
//                             signOut();
//                             navigate('/');
//                         }}>Logout</button>
//                     </div>
//                     <div className="location">
//                         <h3>Location: </h3>
//                         <input type="text" name="profileLocationInput" id="profileLocationInput" className="profileInput"></input>
//                     </div>
//                     <div className="contactInfo">
//                         <h3>Email: </h3>
//                         <input type="text" name="profileEmailInput" id="profileEmailInput" className="profileInput"></input>
//                     </div>
//                     <div className="languages">
//                         <h3>Languages:</h3>
//                         <input type="text" name="profileLanguagesInput" id="profileLanguagesInput" className="profileInput"></input>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default ProfileTop;