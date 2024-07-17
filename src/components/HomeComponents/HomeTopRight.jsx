import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomeTopRight = () => {
    const navigate = useNavigate();
    return (
        <div className="HomeTopRightWrapper">
            <div className="HomeTopRightMessagesWrapper">
                <button type="button" className="HomeTopRightMessages" onClick={() => {
                    navigate('/messages')
                }}>Messages</button>
            </div>
            <div className="HomeTopRightLogoutWrapper">
                <button type="button" className="HomeTopRightMessages" onClick={() => {
                    navigate('/')
                }}>Logout</button>
            </div>
            <div className="HomeTopRightProfileWrapper">
                <button type="button" className="HomeTopRightMessages" onClick={() => {
                    navigate('/profile')
                }}>Profile</button>
            </div>
        </div>
    )
}

export default HomeTopRight;