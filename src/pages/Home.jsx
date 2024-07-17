// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HomeLeft from '../components/HomeComponents/HomeLeft.jsx';
import Feed from '../components/HomeComponents/Feed.jsx';
import Header from '../components/Header.jsx';
import HomeRight from '../components/HomeComponents/HomeRight.jsx';
import '../App.scss';

const Home = () => {
    return (
        <div className="home-wrapper">
            {/* <Header /> */}
            <HomeLeft className="home-left" />
            <Feed className="feed"/>
            <HomeRight className="home-right"/>
        </div>
    );
}

export default Home;
