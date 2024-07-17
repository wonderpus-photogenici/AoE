import React from 'react'
import valRank from '../../Assets/valGold.png';

const ValorantRankChart = () => {
  return (
    <div className="valorant-rank-chart">
        <div className="chart-cell">
            <img src={valRank} alt="valorant rank" className="prof-rank-image" />
            <div className="cell-title">Gold III</div>
        </div>
        <div className="chart-cell">
            <div className="cell-title">KD</div>
            <div className="cell-value">1.22</div>
        </div>
        <div className="chart-cell">
            <div className="cell-title">Highest Rank</div>
            <div className="cell-value">Diamond</div>
        </div>
        <div className="chart-cell">
            <div className="cell-title">Hours</div>
            <div className="cell-value">1.1k</div>
        </div>
    </div>
  )
}

export default ValorantRankChart