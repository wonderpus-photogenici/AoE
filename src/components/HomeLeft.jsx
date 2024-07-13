import React from 'react'
import logo from '../Assets/aoelogo2.png';
import SidebarComponent from './Sidebar.jsx';

const HomeLeft = () => {
  return (
    <div>
        <img src={logo} alt="Logo" />
        <SidebarComponent />
    </div>
  )
}

export default HomeLeft