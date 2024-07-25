import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();
  return (
    <div className="header-wrapper">
      <div className="testHeader">
        <div className="leftCenterDiv">Header</div>
      </div>
      <div className="testHeader2">
        <div className="centerDiv">Header 2</div>
      </div>
      <div className="testHeader3">
        <div className="rightCenterDiv">
          <button type="button" className="homeHeadBtn" onClick={() => {
            // navigate('/login')
          }}>Messages</button>
          <button type="button" className="homeHeadBtn" onClick={() => {
            navigate('/login')
          }}>Logout</button>
          <button type="button" className="homeHeadBtn" onClick={() => {
            navigate('/profile')
          }}>Profile</button>
          <button type="button" className="homeHeadBtn" onClick={() => {
            navigate('/signup')
          }}>Signup</button>
        </div>
      </div>
    </div>
  )
}

export default Header