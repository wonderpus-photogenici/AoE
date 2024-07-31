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
import store from "../../redux/store.js";
import { useDispatch } from 'react-redux';
import { setProfile } from '../../redux/profileSlice';
import { useSelector } from 'react-redux';
import Email from "./Email.jsx";
import Location from "./Location.jsx";
import Languages from "./Languages.jsx";

const ProfileTop = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [location, setLocation] = useState('');
  const [profData, setProfData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [pfpUrl, setPfpUrl] = useState(null);
  const [profile, setProfile] = useState()
  const dispatch = useDispatch();

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
    setProfData(response.data);
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
      setPfpUrl(CDNURL + data.pfp);
    })();
  }, [])


  // listening for changes to state.profile
  const updatedGames = useSelector((state) => state.profile);
  const updatedLanguages = useSelector((state) => state.profileLanguages);
  const updatedLocation = useSelector((state) => state.profileLocation);
  // console.log('updatedGames: ', updatedGames);
  // console.log('updatedLanguages: ', updatedLanguages);

  // If there is a change to state.profile then:
  useEffect(() => {
    if (profData && updatedGames.profile) {
      setProfData({
        ...profData,
        allgames: updatedGames.profile,
      })
    }
  }, [updatedGames]);

  useEffect(() => {
    if (profData && updatedLanguages.profileLanguages) {
      setProfData({
        ...profData,
        languages: updatedLanguages.profileLanguages,
      })
    }
  }, [updatedLanguages])

  useEffect(() => {
    if (profData && updatedLocation.profileLocation) {
      setProfData({
        ...profData,
        location: updatedLocation.profileLocation,
      })
    }
  }, [updatedLocation])


  const myFunction2 = () => {
    document.getElementById('profGamesDrop').style.display = 'block';
  };

  const profGamesFilter = () => {
    if (document.getElementById("profGamesInput") && document.getElementById("profGamesDrop")) {
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

  let profGamesArray = [];
  let availableGames = [];
  if (profData && Object.keys(profData).length !== 0) {

    for (let i = 0; i < profData.allgames.length; i++) {
      profGamesArray.push(<ProfGamesList
        key={`ProfGamesList#${i}`}
        game={profData.allgames[i]}
        i={i}
      />)
    }

    // All available games to pick from
    const gamesArray = ["League of Legends", "Minecraft", "Valorant", "Baldur's Gate 3", "Elden Ring", "Overwatch", "Fortnite", "Apex Legends", "Borderlands 2", "Divinity: Original Sin 2", "FinalFantasy VII", "Assassin's Creed IV: Black Flag", "Fallout 2", "Animal Crossing: New Horizons", "Titanfall 2", "Monster Hunter: World", "Resident Evil 2", "System Shock 2", "Mortal Kombat 11", "Persona 5 Royal", "Dark Souls", "Fable 2", "GoldenEye 007", "Super Smash Bros. Ultimate", "Spelunky", "Return of the Obra Dinn", "Dota 2", "Mario Kart 8 Deluxe", "Donkey Kong", "The Sims 3", "Splinter Cell: Chaos Theory", "Super Mario World 2: Yoshi's Island", "Silent Hill", "Grand Theft Auto: San Andreas", "XCOM 2", "Control", "Call of Duty 4: Modern Warfare", "Rise of the Tomb Raider", "Batman: Arkham City", "Dishonored 2", "The Witness", "Journey", "Uncharted 2: Among Thieves", "Overwatch", "Apex Legends", "Hollow Knight", "Ms. Pac-Man", "Counter-Strike 1.6", "Left 4 Dead 2", "EarthBound", "Diablo II", "StarCraft", "World of WarCraft", "Star Wars: Knights of the Old Republic", "Fallout: New Vegas", "Final Fantasy VI", "Pokémon Yellow", "Metroid Prime", "The Elder Scrolls V: Skyrim", "Resident Evil 4", "Shadow of the Colossus", "The Last of Us Part 2", "Red Dead Redemption", "Metal Gear Solid", "Sid Meier's Civilization IV", "The Legend of Zelda: Ocarina of Time", "Halo: Combat Evolved", "Half-Life", "Final Fantasy XIV", "Doom", "Tetris", "Metal Gear Solid 3: Snake Eater", "Half-Life: Alyx", "God of War", "Chrono Trigger", "Portal", "Street Fighter II", "Super Mario Bros.", "Undertale", "Bloodborne", "BioShock", "The Last of Us", "The Witcher 3: Wild Hunt", "Halo 2", "Castlevania: Symphony of the Night", "Hades", "Grand Theft Auto V", "Super Mario Bros. 3", "Disco Elysium", "Half-Life 2", "Red Dead Redemption 2", "Super Mario 64", "Mass Effect 2", "Super Metroid", "The Legend of Zelda: A Link to the Past", "Portal 2", "Super Mario World", "The Legend of Zelda: Breath of the Wild"];

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

  return (
    <div className="profile-top">
      <div className="profile-top-container">
        {profData && Object.keys(profData).length !== 0 && user && username === user.user_metadata.username ?
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
          {profData && Object.keys(profData).length !== 0 && user && username === user.user_metadata.username ?
            <>
              <div className="allgames">
                {/* <div className="allgamesWrapper">

                </div> */}
              </div>
            </> : <>
              <button className="profileBtn">Add</button>
              <button className="profileBtn">Message</button>
            </>
          }
        </div>

        {/* Basically checking if the logged in user is the same as the user profile that they're */}
        {/* visiting, if they are, then they can edit the bio, if they aren't then they can't */}
        {profData && Object.keys(profData).length !== 0 && user && username === user.user_metadata.username ?
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
          <Location
            location={profData.location}
            user={user}
            username={username}
          />
          <Email
            email={profData.contact_info}
            user={user}
            username={username}
          />
          <Languages
            languages={profData.languages}
            user={user}
            username={username}
          />
          <div className="gamesplayedList">
            <div className="h3Mimic">Games:</div>
            {profData && Object.keys(profData).length !== 0 && user && username === user.user_metadata.username ?
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