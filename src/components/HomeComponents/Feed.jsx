import React from 'react';
import UserRec from './UserRec.jsx';
import HomeGameSearch from './HomeGameSearch.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
// import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Feed = () => {
  // Data Needed: pfp, username, allgames
  // store.subscribe(() => {

  // })
  // console.log('store.getState(): ', store.getState());
  const [feedData, setFeedData] = useState([]);
  // let feedData;

  useEffect(() => {
    getFeedData();
  }, []);

  const getFeedData = async () => {
    const response2 = await axios.post('http://localhost:3001/api/getFeedData')
    // console.log('response2.data: ', response2.data);
    if (response2.data) {
      setFeedData(response2.data);
    };
  };

  if (feedData) {
    let feedDataTemp = feedData;
    
    // I want to be able to change feedDataTemp whenever the redux store state for 
    // feedData is changed, and change feedDataTemp to the value that was dispatched
    // And rerender the feedArray with the updated UserRec components
    // I think this needs a redux listener but idk how to set it up

    let feedArray = [];
    for (let i = 0; i < feedData.length; i++) {
      feedArray.push(<UserRec
        key={`FriendSearchSingle#${i}`}
        username={feedDataTemp[i].username}
        pfp={feedDataTemp[i].pfp}
        allgames={feedDataTemp[i].allgames}
      />)
    }
    return (
      <div className="feed-wrapper">
        < HomeGameSearch
          feedData={feedData}
        />
        {feedArray}
      </div>
    )
  } else {
    return (
      <div className="feed-wrapper">
        < HomeGameSearch />
      </div>
    )
  }

}

export default Feed