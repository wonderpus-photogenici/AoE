import React, { useState } from 'react';
import axios from 'axios';

const RiotAccountInput = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [rankData, setRankData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/api/link-riot-account', { gameName, tagLine });
      setRankData(response.data.ranks);
    } catch (error) {
      console.error('Error linking Riot account:', error);
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="riot-account-input">
      <h3>Link Riot Account</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Game Name:
          <input type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} required />
        </label>
        <label>
          Tag Line:
          <input type="text" value={tagLine} onChange={(e) => setTagLine(e.target.value)} required />
        </label>
        <button type="submit">Link Account</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {rankData && (
        <div className="rank-data-container">
          <h4>Rank Data</h4>
          {rankData.length > 0 ? (
            rankData.map((rank, index) => (
              <div key={index} className="rank-card">
                <h5>Queue Type: {rank.queueType}</h5>
                <p>Tier: <span>{rank.tier}</span></p>
                <p>Rank: <span>{rank.rank}</span></p>
                <p>LP: <span>{rank.leaguePoints}</span></p>
                <p>Wins: <span>{rank.wins}</span></p>
                <p>Losses: <span>{rank.losses}</span></p>
              </div>
            ))
          ) : (
            <p>No rank data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RiotAccountInput;