import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import GoogleLoginButton from '../components/GoogleLogin.jsx';

import '../App.scss';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { user } = response.data;
        dispatch(setUser(user));
        console.log('Login successful:', user);
        navigate('/home');
      } else {
        console.error('Unexpected status code:', response.status);
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('An error occurred during login');
    }
  };

  return (
    <div className='wrapper'>
      <GoogleLoginButton />
      <div className='animate_animated animate__fadeInLeft'>
        <div className='form-container'>
          <div className='title'>Login</div>
          <form onSubmit={handleSubmit}>
            <div className='field'>
              <input
                type="text"
                name="username"
                placeholder='Username'
                value={username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='field'>
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field">
              <button type="submit" className='login-btn'>Login</button>
            </div>
            <div className='link-to-p'>
              <p>New User? <Link to='/signup'>Register Here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
