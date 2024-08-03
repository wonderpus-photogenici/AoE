import React from 'react';
import HomeLeft from '../components/HomeComponents/HomeLeft.jsx';
import ProfileTop from '../components/ProfileComponents/ProfileTop.jsx';
import ProfileStats from '../components/ProfileComponents/ProfileStats.jsx';
import RiotAccountInput from '../components/ProfileComponents/RiotAccountInput.jsx';
import ChatBoxWrapper from '../components/ChatBoxWrapper.jsx';

const Profile = () => {
    return (
        <div className="profile-container">
            <HomeLeft />
            <ProfileTop />
            <RiotAccountInput />
            <ChatBoxWrapper />
        </div>
    );
};

export default Profile;
