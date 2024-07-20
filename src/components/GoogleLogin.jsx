import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import googleButton from '/src/Assets/btn_google_signin_dark_pressed_web.png';
const GoogleLoginButton = () => {


  function navigate(url) {
    window.location.href = url
  }

  async function auth() {
    const response = await fetch('http://127.0.0.1:3001/request',
    {method: 'post'});
    const data = await response.json();
    navigate(data.url);
  }

  //const dispatch = useDispatch();

  // const onSuccess = async (response) => {
  //   try {
  //     const res = await axios.post('http://localhost:3001/api/google-login', {
  //       token: response.credential,
  //     });
  //     dispatch(setUser(res.data.user));
  //     console.log('Login Success:', res.data);
  //   } catch (error) {
  //     console.error('Google login error:', error);
  //   }
  // };

  // const onFailure = (error) => {
  //   console.log('Login Failed:', error);
  // };

  return (
    <div id="signInButton" onClick={() => auth()}>
       <img className ='oauthBtton' src = {googleButton} alt="google sign in"/>
      {/* <GoogleLogin
        //onSuccess={onSuccess}
        //onFailure={onFailure}
        //cookiePolicy={'single_host_origin'}
      /> */}
      {/* <button type = "button" onClick={() => auth()} >
        <img src = {googleButton} alt="google sign in"/>
      </button> */}
      {/* /> */}
      {/* <button type = "button" onClick={() => auth()} >
        <img src = {googleButton} alt="google sign in"/>
      </button> */}
    </div>
  );
};
export default GoogleLoginButton;