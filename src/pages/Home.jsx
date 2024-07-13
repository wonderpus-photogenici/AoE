// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HomeLeft from '../components/HomeLeft.jsx';
import Feed from '../components/Feed.jsx';
import HomeRight from '../components/HomeRight.jsx';
import '../App.scss';

const Home = () => {
    return (
        <div className="home-wrapper">
            <h1>Welcome to AoE</h1>
            <p>Please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></p>
            <HomeLeft />
            <Feed />
            <HomeRight />
        </div>
    );
}

export default Home;
