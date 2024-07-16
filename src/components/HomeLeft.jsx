import React from 'react'
import logo from '../Assets/aoelogo3_kyler.png';
// import logo from '../Assets/aoelogo2.png';
import SidebarComponent from './Sidebar.jsx';
import axios from 'axios';

const HomeLeft = () => {
  return (
    <div className="home-left">
      <div className="home-left-container">
          <img className="home-logo" src={logo} alt="Logo" />
          <SidebarComponent />
        </div>
    </div>
  )
}

export default HomeLeft;