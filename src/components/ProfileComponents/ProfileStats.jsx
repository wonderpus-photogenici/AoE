import React from 'react';
import { useSelector } from 'react-redux';

const ProfileStats = () => {
    const summonerData = useSelector((state) => state.riot.summonerData);

    return (
        <div>
            <h3>Profile Stats</h3>
            {summonerData ? (
                <div>
                    <p>Summoner Name: {summonerData.name}</p>
                    <p>Level: {summonerData.summonerLevel}</p>
                    {/* Add more fields as needed */}
                </div>
            ) : (
                <p>No summoner data available.</p>
            )}
        </div>
    );
};

export default ProfileStats;
