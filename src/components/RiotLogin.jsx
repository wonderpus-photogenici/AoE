import React from 'react';
import { useDispatch } from 'react-redux';
//import { setAccessToken } from '../redux/riotSlice';
import axios from 'axios';

const RiotLogin = () => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const clientId = 'YOUR_RIOT_CLIENT_ID';
    const redirectUri = 'http://localhost:8080/riot-callback';

    // Redirect to Riot Games OAuth authorization endpoint
    window.location.href = `https://auth.riotgames.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;
  };

  return (
    <button onClick={handleLogin} className="oauth-btn riot-games">
      Login with Riot Games
    </button>
  );
};

export default RiotLogin;