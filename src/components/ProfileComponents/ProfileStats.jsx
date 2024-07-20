import React from 'react';
import { useSelector } from 'react-redux';

const ProfileStats = () => {
    const summonerData = useSelector((state) => state.riot.summonerData);

    return (
        <div>
        </div>
    );
};

export default ProfileStats;

/*            <h3>Profile Stats</h3>
            {summonerData ? (
                <div>
                    <p>Summoner Name: {summonerData.name}</p>
                    <p>Level: {summonerData.summonerLevel}</p>
       
                </div>
            ) : (
                <p>No summoner data available.</p>
            )}*/ 