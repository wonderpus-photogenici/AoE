import React from "react";
import "../../App.scss";
import axios from 'axios';
// fuzzysort used for a fuzzy search
import fuzzysort from 'fuzzysort'
import { useState, useEffect } from 'react'
import FriendSearchComp from "./FriendSearchComp.jsx";
import { useDispatch } from 'react-redux';
import { setAllUsers } from '../../redux/allUsersSlice.js';
import store from '../../redux/store.js';

// THIS IS A TEMPLATE FOR NOW - WE WILL FILL OUT CORRECTLY WHEN WE SET UP APP NAVIGATION FLOW
const SidebarRightComponent = () => {
  const [charactersList, setCharacters] = useState([]);

  const dispatch = useDispatch();

  // const friendsSearchArray = [];
  let matches;
  // There has to be a better way to search a databse for users with usernames close to what is typed in
  // other than returning all the users in the database then searching through all of them
  // but idk what it is and this will work for our case 
  // More efficient would probably be, on page load retrieve all users from database, so we're not retrieving
  // all users every single time an input is made
  // or maybe on input box selection retrieve all users from database
  const retrieveAllUsers = async (event) => {
    // event.preventDefault();
    try {
      console.log('in retrieveAllUsers');
      let allUsers = await axios.post('http://localhost:3001/api/findAllUsers');
      // console.log('allUsers.data: ', allUsers.data);
      dispatch(setAllUsers(allUsers.data));
    } catch (err) {
      console.error('error in retrieveAllUsers:', error.response?.data || error.message);
    }
  }

  const handleFriendSearch = async (event) => {
    event.preventDefault();
    try {
      let value = document.getElementById('friendsSearchInput').value;

      // Using the next two lines is great if we need the most up to date user data
      // immediately, but making a post request on every single input seems a bit excessive
      // for this use case, it does seem to be more reliable than storing in redux 
      // store though
      // const response = await axios.post('http://localhost:3001/api/findAllUsers');
      // matches = fuzzysort.go(value, response.data);

      // so when the search bar is clicked on, it'll send the 
      matches = fuzzysort.go(value, store.getState().allUsers.allUsers);
      let testArray = [];

      if (matches.total !== 0) {
        document.getElementById('friendsDropDown').style.display = 'block';
      } else {
        document.getElementById('friendsDropDown').style.display = 'none';
      }

      for (let i = 0; i < 5; i++) {
        if (matches[i] === undefined) {
        } else {
          testArray.push(matches[i].target);
        }
      }

      const characters = async () => {
        setCharacters(testArray);
      }
      characters()

    } catch (error) {
      console.error('error in handleFriendSearch:', error.response?.data || error.message);
      alert('An error occurred during login');
    }
  };

  // When you click anywhere that's not the friendsSearchInput, the
  // dropdown menu disappears
  window.onclick = function (event) {
    if (document.getElementById('friendsDropDown') !== null) {
      if (!event.target.matches('#friendsSearchInput')) {
        document.getElementById('friendsDropDown').style.display = 'none';
      }
    }
  }


  return (
    // Obviously later rewrite this to dynamically import
    // and fill from their friends list/ groups list/ clan list, just a placeholder for now
    <div className="homeRightSideBarWrapper">
      <div className="homeRightSideBarBreak">
        <div className="homeRightSideBarGroupName">
          <span>Add Friends</span>
        </div>
        <div className="homeRightSideBarGroupSearch dropdown">
          {/* It would probably be better to retrieve all users from db on page load, or */}
          {/* onClick, unless we absolutely need the latest users list immediately */}
          {/* it should be fine to only get the users list onClick */}
          {/* decided to use onFocus instead of onClick, since someone could shift into */}
          {/* the input field or some other way of bringing it into focus */}
          <input type="text" placeholder="Search" id="friendsSearchInput" className="homeSearchInput" onInput={handleFriendSearch} onFocus={() => {
            retrieveAllUsers();
            document.getElementById('friendsDropDown').style.display = 'block';
          }}></input>
          <FriendSearchComp
            friendSearchResults={charactersList}
          />
        </div>
        {/* <div className="homeLeftSideBarGroupAdd">
          <button type="button" className="homeFriendSearchAddBtn" onClick={() => {
            // Add some redirect to the specified profile stuff here once profiles get set up

          }}>Add</button>
        </div> */}
      </div>
      <div className="homeRightSideBarBreak">
        <div className="homeRightSideBarGroupName">
          <span>Friends</span>
        </div>
        <div className="homeRightSideBarGroupSearch dropdown">
          {/* This input is used to search for a friend already on their friend's list */}
          <input type="text" placeholder="Search" className="homeSearchInput" ></input>
        </div>
        {/* <div className="homeLeftSideBarGroupAdd">
          <button type="button" className="homeFriendSearchAddBtn" onClick={() => {
            // Add some redirect to the specified profile stuff here once profiles get set up

          }}>Add</button>
        </div> */}
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">
          PFP
        </div>
        <div className="homeRightSideBarContent">
          <span>Friend 1</span>
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeRightSideBarBreak">
      <div className="homeRightSideBarGroupName">
          <span>Groups</span>
        </div>
        <div className="homeRightSideBarGroupSearch dropdown">
          {/* This input is used to search for a group already on their group's list */}
          <input type="text" placeholder="Search" className="homeSearchInput" ></input>
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeRightSideBar">
        <div className="homeRightSideBarIcon">

        </div>
        <div className="homeRightSideBarContent">
          Hello
        </div>
      </div>
    </div>
  );
};

export default SidebarRightComponent;

// FLOWBITE REACT DOCS: https://flowbite-react.com/docs/components/sidebar
