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