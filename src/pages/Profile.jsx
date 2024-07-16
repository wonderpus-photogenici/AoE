import React from 'react'
import HomeLeft from '../components/HomeLeft.jsx';
import ProfileTop from '../components/ProfileComponents/ProfileTop.jsx';
import ProfileStats from '../components/ProfileComponents/ProfileStats.jsx';

const Profile = () => {
  return (
    <div className="profile-container">
      <HomeLeft />
      <ProfileTop />
      <ProfileStats />
    </div>
  )
}

export default Profile;