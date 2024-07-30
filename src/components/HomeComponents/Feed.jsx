import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserRec from './UserRec.jsx';

const Feed = () => {
  const [feedData, setFeedData] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState('');
  const [gameFilter, setGameFilter] = useState('');
  // const [availableGames, setAvailableGames] = useState([]);

  useEffect(() => {
    getFeedData();
  }, []);

  // When feedData changes, run extractAvailableGames();
  // useEffect(() => {
  //   extractAvailableGames();
  // }, [feedData]);

  // Function to get all of the user's usernames, pfps, and games played
  const getFeedData = async () => {
    const response = await axios.post('http://localhost:3001/api/getFeedData');
    if (response.data) {
      setFeedData(response.data);
    }
  };

  // const extractAvailableGames = () => {
  //   const gamesSet = new Set();
  //   feedData.forEach(item => {
  //     item.allgames.forEach(game => {
  //       gamesSet.add(game);
  //     });
  //   });
  //   setAvailableGames(Array.from(gamesSet));
  // };

  const handleUsernameFilterChange = (e) => {
    setUsernameFilter(e.target.value);
  };

  const handleGameFilterChange = (e) => {
    setGameFilter(e.target.value);
  };

  const filteredFeedData = feedData.filter(item => {
    const usernameMatch = item.username.toLowerCase().includes(usernameFilter.toLowerCase());
    const gameMatch = gameFilter === '' || item.allgames.includes(gameFilter);
    return usernameMatch && gameMatch;
  });

  const feedArray = filteredFeedData.map((data, index) => (
    <UserRec
      key={`FriendSearchSingle#${index}`}
      username={data.username}
      pfp={data.pfp}
      allgames={data.allgames}
      bio={data.bio}
    />
  ));

  const availableGames = ["League of Legends", "Minecraft", "Valorant", "Baldur's Gate 3", "Elden Ring", "Overwatch", "Fortnite", "Apex Legends", "Borderlands 2", "Divinity: Original Sin 2", "FinalFantasy VII", "Assassin's Creed IV: Black Flag", "Fallout 2", "Animal Crossing: New Horizons", "Titanfall 2", "Monster Hunter: World", "Resident Evil 2", "System Shock 2", "Mortal Kombat 11", "Persona 5 Royal", "Dark Souls", "Fable 2", "GoldenEye 007", "Super Smash Bros. Ultimate", "Spelunky", "Return of the Obra Dinn", "Dota 2", "Mario Kart 8 Deluxe", "Donkey Kong", "The Sims 3", "Splinter Cell: Chaos Theory", "Super Mario World 2: Yoshi's Island", "Silent Hill", "Grand Theft Auto: San Andreas", "XCOM 2", "Control", "Call of Duty 4: Modern Warfare", "Rise of the Tomb Raider", "Batman: Arkham City", "Dishonored 2", "The Witness", "Journey", "Uncharted 2: Among Thieves", "Overwatch", "Apex Legends", "Hollow Knight", "Ms. Pac-Man", "Counter-Strike 1.6", "Left 4 Dead 2", "EarthBound", "Diablo II", "StarCraft", "World of WarCraft", "Star Wars: Knights of the Old Republic", "Fallout: New Vegas", "Final Fantasy VI", "Pokémon Yellow", "Metroid Prime", "The Elder Scrolls V: Skyrim", "Resident Evil 4", "Shadow of the Colossus", "The Last of Us Part 2", "Red Dead Redemption", "Metal Gear Solid", "Sid Meier's Civilization IV", "The Legend of Zelda: Ocarina of Time", "Minecraft", "Halo: Combat Evolved", "Half-Life", "Final Fantasy XIV", "Doom", "Tetris", "Metal Gear Solid 3: Snake Eater", "Half-Life: Alyx", "God of War", "Chrono Trigger", "Portal", "Street Fighter II", "Super Mario Bros.", "Undertale", "Bloodborne", "BioShock", "The Last of Us", "The Witcher 3: Wild Hunt", "Halo 2", "Castlevania: Symphony of the Night", "Hades", "Grand Theft Auto V", "Super Mario Bros. 3", "Disco Elysium", "Half-Life 2", "Red Dead Redemption 2", "Super Mario 64", "Mass Effect 2", "Super Metroid", "The Legend of Zelda: A Link to the Past", "Portal 2", "Super Mario World", "The Legend of Zelda: Breath of the Wild"];

  return (
    <div className="feed-wrapper">
      {/* <HomeGameSearch feedData={feedData} /> */}
      <div className="filter-container">
        <div className="filter-input">
          <label>Filter by Username:</label>
          <input type="text" value={usernameFilter} onChange={handleUsernameFilterChange} />
        </div>
        <div className="filter-input">
          <label>Filter by Game:</label>
          <select value={gameFilter} onChange={handleGameFilterChange}>
            <option value="">All Games</option>
            {availableGames.map((game, index) => (
              <option key={index} value={game}>
                {game}
              </option>
            ))}
          </select>
        </div>
      </div>
      {feedArray.length > 0 ? feedArray : <p>No results found.</p>}
    </div>
  );
};

export default Feed; 