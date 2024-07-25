import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import GoogleLoginButton from '../components/GoogleLogin.jsx';
import '../App.scss';
import store from '../redux/store';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import leagueBackground from '../Assets/LeagueWallpaper.png';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const supabase = useSupabaseClient();

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

      const email = await axios.post('http://localhost:3001/api/getEmail', {
        username,
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.data,
        password: password,
      });

      if (error) {
        alert(
          'Sign in error: Error communicating with supabase, make sure to use a real email address!'
        );
        console.log(error);
      } else {
        // Supabase only allows 3 emails per hour, so I turned off verify email in supabase for now
        // alert("Check your email to Log in");
      }

      if (response.status === 200) {
        // console.log('response: ', response);
        const user = response.data;
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
    <div
      className="wrapper"
      style={{ backgroundImage: 'url(' + leagueBackground + ')' }}
    >
      <GoogleLoginButton />
      <div className="animate_animated animate__fadeInLeft">
        <div className="form-container">
          <div className="title">Login</div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field">
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
            <div className="link-to-p">
              <p>
                New User? <Link to="/signup">Register Here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
