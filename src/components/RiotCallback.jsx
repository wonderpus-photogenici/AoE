import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RiotCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      try {
        const response = await axios.post('https://auth.riotgames.com/oauth2/token', {
          client_id: 'YOUR_RIOT_CLIENT_ID',
          client_secret: 'YOUR_RIOT_CLIENT_SECRET',
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'http://localhost:8080/riot-callback',
        });

        const { access_token } = response.data;
        dispatch(setAccessToken(access_token));
        navigate('/profile');
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, [dispatch, navigate]);

  return <div>Loading...</div>;
};

export default RiotCallback;