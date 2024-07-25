import React from 'react'
import logo from '../../Assets/aoelogo3_kyler.png';
// import logo from '../Assets/aoelogo2.png';
import SideBarLeft from './SidebarLeft.jsx';

const HomeLeft = () => {
  return (
    <div className="home-left">
      <div className="home-left-container">
          <img className="home-logo" src={logo} alt="Logo" />
        </div>
        <SideBarLeft />
    </div>
  )
}

export default HomeLeft;