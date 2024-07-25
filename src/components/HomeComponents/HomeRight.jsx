import React from 'react'
import SidebarRightComponent from './SidebarRight.jsx';
import HomeTopRight from './HomeTopRight.jsx';

const HomeRight = () => {
  return (
    <div className="homeright-wrapper">
      <HomeTopRight />
      <SidebarRightComponent />
    </div>
  )
}

export default HomeRight