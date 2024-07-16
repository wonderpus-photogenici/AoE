import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import GoogleLoginButton from '../components/GoogleLogin.jsx';
import convertFileToBase64 from '../../utils/fileUtils';
import '../App.scss';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'email') setEmail(value);
    if (name === 'profilePicture') setProfilePicture(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64ProfilePicture = '';
    if (profilePicture) {
      base64ProfilePicture = await convertFileToBase64(profilePicture);
    }

    const requestBody = {
      username,
      password,
      email,
      pfp: base64ProfilePicture,
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
    <div className='wrapper'>
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
              placeholder='Email (optional):'
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className='field'>
            <input
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
