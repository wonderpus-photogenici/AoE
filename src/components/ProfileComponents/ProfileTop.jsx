import React from "react";
import noPfp from "../../Assets/noPfp.png";
import leagueLogo from "../../Assets/leagueLogo.png";
import valorantLogo from "../../Assets/valorantLogo.png";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProfGamesList from "./ProfGamesList.jsx";
import GamesSingle from './GamesSingle.jsx';

const ProfileTop = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  // const [images, setImages] = useState([]);
  const [location, setLocation] = useState('');
  const [profData, setProfData] = useState({});
  const [gamesList, setGamesList] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [pfpUrl, setPfpUrl] = useState(null);
  const [profGames, setProfGames] = useState([]);

  const currentUrl = window.location.href;
  const username = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

  const CDNURL = "https://gusnjhjnuugqaqtgwhym.supabase.co/storage/v1/object/public/AoE/";
  // CDNURL + user.id + "/" + image.name

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  };

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
  };

  async function getProfData() {
    const response = await axios.post('http://localhost:3001/api/getProfData', {
      username: username,
    })
    // console.log('response.data: ', response.data);
    setProfData(response.data);
    // if (Object.keys(profData).length !== 0) {
    //   let gamesListArray = [];
    //   for (let i = 0; i < profData.allgames.length; i++) {
    //     console.log('profData.allgames[i]: ', profData.allgames[i]);
    //     gamesListArray.push(
    //     <ProfGamesList
    //     game = {profData.allgames[i]}
    //     />)
    //   }
    //   setGamesList(gamesListArray);
    // }
  }


  useEffect(() => {
    getUser();
    getProfData();
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await axios.post('http://localhost:3001/api/getProfData', {
        username: username,
      });
      console.log('data: ', data);
      setPfpUrl(CDNURL + data.pfp);
      // console.log('profGamesArray: ', profGamesArray);
    })();

    // const pfp = makeRequest();
    // console.log('pfp: ', pfp);
    // setPfpUrl(pfp.pfp);
  }, [])

  const locationsArray = ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina'];



  const myFunction2 = () => {
    document.getElementById('profGamesDrop').style.display = 'block';
  };

  const profGamesFilter = () => {
    var input, filter, ul, li, adiv, i;
    input = document.getElementById("profGamesInput");
    filter = input.value.toUpperCase();
    let div = document.getElementById("profGamesDrop");
    console.log('div: ', div);
    adiv = div.getElementsByTagName("div");
    console.log('adiv: ', adiv);
    for (i = 0; i < adiv.length; i++) {
      let txtValue = adiv[i].textContent || adiv[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        adiv[i].style.display = "";
      } else {
        adiv[i].style.display = "none";
      }
    }
  };

  const saveBio = async (e) => {
    if (user) {
      const response = await axios.post('/api/saveBio', {
        bio: e.target.value,
        username: user.user_metadata.username,
      })
    }
  }

  const handleInputChange = (event) => {
    const { files } = event.target;
    setProfilePicture(files[0]);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (user === null) {
      return
    }

    let file = profilePicture;

    const pfpPath = await axios.post('http://localhost:3001/api/getPfpPath', {
      username: username,
    })

    const uniq = pfpPath.data.substring(pfpPath.data.lastIndexOf("/") + 1);
    // Deleting the old pfp
    const { data, error } = await supabase
      .storage
      .from('AoE')
      .remove([user.id + "/" + uniq]);

    let supabaseUploadPfpResponse;

    // Uploading the new pfp
    supabaseUploadPfpResponse = await supabase
      .storage
      .from('AoE')
      .upload(user.id + "/pfp" + Date.now(), file)

    if (supabaseUploadPfpResponse.data) {
      setPfpUrl(CDNURL + supabaseUploadPfpResponse.data.path);
    }

    const requestBody = {
      username: username,
      pfp: supabaseUploadPfpResponse.data.path,
    };

    try {
      const response = await fetch('/api/updatePfp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
      } else if (response.status === 409) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  if (profilePicture) {
    handleSubmit();
    setProfilePicture(null);
  }

  const navigate = useNavigate();

  // if (Object.keys(profData).length !== 0) {
  //   let profGamesArray = [];
  //   for (let i = 0; i < profData.allgames; i++) {
  //     profGamesArray.push(<ProfGamesList 
  //       key={`ProfGamesList#${i}`}
  //       game= {profData.allgames[i]}
  //     />)
  //   }
  // }

  let profGamesArray = [];
  let availableGames = [];
  if (Object.keys(profData).length !== 0) {
    for (let i = 0; i < profData.allgames.length; i++) {
      profGamesArray.push(<ProfGamesList
        key={`ProfGamesList#${i}`}
        game={profData.allgames[i]}
      />)
    }

    // All available games to pick from
    const gamesArray = ["League of Legends", "Minecraft", "Valorant", "Baldur's Gate 3", "Elden Ring", "Overwatch", "Fortnite", "Apex Legends", "Borderlands 2", "Divinity: Original Sin 2", "FinalFantasy VII", "Assassin's Creed IV: Black Flag", "Fallout 2", "Animal Crossing: New Horizons", "Titanfall 2", "Monster Hunter: World", "Resident Evil 2", "System Shock 2"];

    for (let i = 0; i < gamesArray.length; i++) {
      if (profData.allgames.includes(gamesArray[i])) {
        availableGames.push(<GamesSingle
          key={`GamesSingle#${i}`}
          game={gamesArray[i]}
          plays={true}
        />);
      } else {
        availableGames.push(<GamesSingle
          key={`GamesSingle#${i}`}
          game={gamesArray[i]}
          plays={false}
        />);
      }
    };
  }


  if (user && user.user_metadata.username === username && Object.keys(profData).length !== 0) {
    window.onclick = function (event) {
      if (document.getElementById('gamesplayedListAdd') !== null) {
        if (!event.target.matches('.gamesplayedListAdd') && !event.target.matches('#gamesplayedListAdd') && !event.target.matches('#profGamesInput') && !event.target.matches('#profGamesDrop') && !event.target.matches('.ProfGamesList')) {
          document.getElementById('profGamesDrop').style.display = 'none';
        }
      }
    };
  }

  return (
    <div className="profile-top">
      <div className="profile-top-container">
        {Object.keys(profData).length !== 0 && user && username === user.user_metadata.username ?
          <>
            <div className="pfpContainer">
              <label htmlFor="image" className="home-logo home-logo-ownProfile">
                <input type="file"
                  name="image"
                  id="image"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                ></input>
                <img className="home-logo home-logo-ownProfile" src={pfpUrl} alt="profile pic"
                  onError={() => {
                    console.log('error in img');
                  }}
                  onMouseEnter={() => { document.getElementById('pfpTextEdit').style.display = "block"; }}
                  onMouseLeave={() => { document.getElementById('pfpTextEdit').style.display = "none" }}
                />
              </label>
              <div className="pfpTextEdit" id="pfpTextEdit">Edit</div>
            </div>
          </> : <>
            <div className="pfpContainer">
              <img className="home-logo" src={CDNURL + profData.pfp} alt="profile pic" />
            </div>
          </>
        }
        <div className="username-addBtn-messageBtn">
          <h1 id="profile-username" className="profile-username">{username}</h1>
          {Object.keys(profData).length !== 0 && user && username === user.user_metadata.username ?
            <>
              <div className="allgames">
                <div className="allgamesWrapper">

                </div>
              </div>
            </> : <>
              <button className="profileBtn">Add</button>
              <button className="profileBtn">Message</button>
            </>
          }
        </div>

        {/* Basically checking if the logged in user is the same as the user profile that they're */}
        {/* visiting, if they are, then they can edit the bio, if they aren't then they can't */}
        {Object.keys(profData).length !== 0 && user && username === user.user_metadata.username ?
          <>
            <textarea id="profileTopBio" className="profileTopBio" placeholder="Describe yourself here..." defaultValue={profData.bio} onInput={(e) => {
              saveBio(e)
            }
            }></textarea>
          </> : <>
            <textarea readOnly id="profileTopBio" className="profileTopBio" placeholder="Describe yourself here..." defaultValue={profData.bio} style={{ outline: 'none' }}></textarea>
          </>
        }

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
            <input type="text" name="profileLocationInput" id="profileLocationInput" className="profileInput" defaultValue={location}></input>
          </div>
          <div className="contactInfo">
            <h3>Email: </h3>
            <input type="text" name="profileEmailInput" id="profileEmailInput" className="profileInput"></input>
          </div>
          <div className="languages">
            <h3>Languages:</h3>
            <input type="text" name="profileLanguagesInput" id="profileLanguagesInput" className="profileInput"></input>
          </div>
          <div className="gamesplayedList">
            <div className="h3Mimic">Games:</div>
            {Object.keys(profData).length !== 0 && user && username === user.user_metadata.username ?
              <>
                <div id="gamesplayedListAdd" className="gamesplayedListAdd" onClick={() => {
                  myFunction2();
                }}>{profGamesArray}
                </div>
                <div id="profGamesDrop" className="profGamesDrop">
                  <input type="text" placeholder="Search.." id="profGamesInput" onKeyUp={profGamesFilter}></input>
                  <div className="profGamesDropAvailList">
                    {availableGames}
                  </div>
                </div>
              </> : <>
                <div id="gamesplayedListAdd" className="gamesplayedListAdd" >{profGamesArray}</div>
              </>
            }
          </div>
        </div>
      </div>


    </div>
  );
};
export default ProfileTop;