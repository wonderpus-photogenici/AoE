import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummonerData } from '../redux/riotSlice';

const SummonerInfo = () => {
  const dispatch = useDispatch();
  const { summonerData, error } = useSelector(state => state.riot);
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'gameName') setGameName(value);
    if (name === 'tagLine') setTagLine(value);
  };

  const handleFetchData = () => {
    if (gameName && tagLine) {
      dispatch(fetchSummonerData(gameName, tagLine));
    }
  };

  return (
    <div>
      <div className="field">
        <input
          type="text"
          name="gameName"
          placeholder="Game Name"
          value={gameName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="field">
        <input
          type="text"
          name="tagLine"
          placeholder="Tag Line"
          value={tagLine}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="field">
        <button onClick={handleFetchData}>Fetch Summoner Data</button>
      </div>
      {error && <p>Error fetching data: {error}</p>}
      {summonerData && (
        <div>
          <h2>{summonerData.gameName}</h2>
          <p>Tag Line: {summonerData.tagLine}</p>
          <p>PUUID: {summonerData.puuid}</p>
        </div>
      )}
    </div>
  );
};

export default SummonerInfo;