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

  const availableGames = ["League of Legends", "Minecraft", "Valorant", "Baldur's Gate 3", "Elden Ring", "Overwatch", "Fortnite", "Apex Legends"];

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