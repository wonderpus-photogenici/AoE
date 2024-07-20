import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import GoogleLoginButton from '../components/GoogleLogin.jsx';
import convertFileToBase64 from '../../utils/fileUtils';
import '../App.scss';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import leagueBackground from '../Assets/LeagueWallpaper.png'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const supabase = useSupabaseClient();

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'email') setEmail(value);
    if (name === 'profilePicture') setProfilePicture(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let base64ProfilePicture = '';
    // if (profilePicture) {
    //   base64ProfilePicture = await convertFileToBase64(profilePicture);
    // }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username, // Include username in user_metadata
            }
        }
    });

     console.log('Sign Up Response:', data); // Log the sign-up response data
    if (error) {
      alert("Make sure password is at least 6 characters long");
      console.log(error);
    } else {
      // console.log('passWordSignUp Data: ', data);
      console.log('data.user.id: ', data.user.id);
      // Supabase only allows 3 emails per hour, so I turned off verify email in supabase for now
      // alert("Check your email to Log in");
    }
    if (data.user === null ) {
      return
    }
    // async function uploadImagePfp(e) {
      let file = profilePicture;
      // const usernameTest = "usernameTest"

      const supabaseUploadPfpResponse = await supabase
        .storage
        .from('AoE')
        // upload to user.id/{filename}
        // for our use case, it would probably be: .upload(userName + "/" + uuidv4(), file)
        .upload(data.user.id + "/pfp", file) // Cooper/{randomString}
      // uuid, we use uuid because if someone wanted to upload two images
      // that had the same name, it wouldn't let them save the same file name twice, so we put a unique
      // id in front to make the images appear unique


      if (supabaseUploadPfpResponse.data) {
        // getImages to load them, it takes the images from the user's folder and sets them to that
        // users state
        // getImages();
        console.log('supabaseUploadPfpResponse.data: ', supabaseUploadPfpResponse.data);
      } else {
        console.log(supabaseUploadPfpResponse.error);
      }
    // }

    const requestBody = {
      username,
      password,
      email,
      pfp: supabaseUploadPfpResponse.data.path,
      supabase_id: data.user.id,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.message);
        alert('You are all set! Please Log in now!')
        // Redirect to login page after successful registration
        navigate('/login')
      } else if (response.status === 409) {
        const data = await response.json();
        console.log(data.message);
        // Handle username already exists error
      } else {
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='wrapper' style={{backgroundImage: "url(" + leagueBackground + ")"}}>
      <GoogleLoginButton />
      <div className='form-container'>
        <div className='title'>Register</div>
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <input
              type="text"
              name="username"
              placeholder='Username:'
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='field'>
            <input
              type="password"
              name="password"
              placeholder='Password:'
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='field'>
            <input
              type="email"
              name="email"
              placeholder='Email:'
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='field'>
            <label htmlFor="signupPfp">Profile Picture:</label>
            <input
              id = "signupPfp"
              type="file"
              name="profilePicture"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field">
            <button type="submit" className='register-btn'>Register</button>
          </div>
          <div className='link-to-p'>
            <p>Already have an account? <Link to='/login'>Login Here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
