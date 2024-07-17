import React from 'react'
import ValorantRankChart from './ValorantRankChart.jsx';
import LeagueRankChart from './LeagueRankChart.jsx';

const ProfileStats = () => {
  return (
    <div className="profile-stats-container">
      <ValorantRankChart />
      <LeagueRankChart />
    </div>
  )
}
export default ProfileStats;





