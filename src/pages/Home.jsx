// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.scss';

const Home = () => {
    return (
        <div className="home-wrapper">
            <h1>Welcome to Our App</h1>
            <p>Please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></p>
        </div>
    );
}

export default Home;
