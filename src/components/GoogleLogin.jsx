import React from 'react'
import { GoogleLogin } from '@react-oauth/google';

const GoogleLogin = () => {
    const onSuccess = (response) => {
        console.log('Login Success:', response);
    };

    const onFailure = (error) => {
        console.log('Login Failed:', error);
    };

  return (
    <div id="signInButton">
        <GoogleLogin 
        buttonText="Login"
        onSuccess={onSuccess} 
        onFailure={onFailure} 
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
    </div>
  )
}
// Google Login Library handles functionality for us, which is why onSuccess an onFailure functions are pretty bare bones
export default GoogleLogin