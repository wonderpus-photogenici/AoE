import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import "../App.scss";
import axios from 'axios';
// fuzzysort used for a fuzzy search
import fuzzysort from 'fuzzysort'
import FriendSearchSingle from "./FriendSearchSingle.jsx";
import { useState, useEffect } from 'react'
import FriendSearchComp from "./FriendSearchComp.jsx";

// THIS IS A TEMPLATE FOR NOW - WE WILL FILL OUT CORRECTLY WHEN WE SET UP APP NAVIGATION FLOW
const SidebarComponent = () => {
  const [charactersList, setCharacters] = useState([]);

  // const friendsSearchArray = [];
  let matches;
  let allUsers;
  // There has to be a better way to search a databse for users with usernames close to what is typed in
  // other than returning all the users in the database then searching through all of them
  // but idk what it is and this will work for our case 
  // More efficient would probably be, on page load retrieve all users from database, so we're not retrieving
  // all users every single time an input is made
  // or maybe on input box selection retrieve all users from database
  const retrieveAllUsers = async (event) => {
    // event.preventDefault();
    try {
      allUsers = await axios.post('http://localhost:3001/api/findAllUsers');
    } catch (err) {
      console.error('error in retrieveAllUsers:', error.response?.data || error.message);
    }
  }

  const handleFriendSearch = async (event) => {
    event.preventDefault();
    try {
      let value = document.getElementById('friendsSearchInput').value;
      // const response = await axios.post('http://localhost:3001/api/findAllUsers');
      // matches = fuzzysort.go(value, response.data);
      // I can user allUsers if I save it to the redux store probably
      console.log(allUsers);
      matches = fuzzysort.go(value, allUsers.data);
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
    if (!event.target.matches('#friendsSearchInput')) {
      document.getElementById('friendsDropDown').style.display = 'none';
    }
  }


  return (
    // Obviously later rewrite this to dynamically import
    // and fill from their friends list/ groups list/ clan list, just a placeholder for now
    <div className="homeLeftSideBarWrapper">
      <div className="homeLeftSideBarBreak">
        <div className="homeLeftSideBarGroupName">
          <span>Friends</span>
        </div>
        <div className="homeLeftSideBarGroupSearch dropdown">
          {/* It would probably be better to retrieve all users from db on page load, or */}
          {/* onClick, unless we absolutely need the latest users list immediately */}
          {/* it should be fine to only get the users list onClick */}
          <input type="text" placeholder="Search" id="friendsSearchInput" className="homeSearchInput" onInput={handleFriendSearch} onClick={() => {
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
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">
          PFP
        </div>
        <div className="homeLeftSideBarContent">
          <span>Friend 1</span>
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBarBreak">
        Groups
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBarBreak">
        Clan
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
      <div className="homeLeftSideBar">
        <div className="homeLeftSideBarIcon">

        </div>
        <div className="homeLeftSideBarContent">
          Hello
        </div>
      </div>
    </div>
    // <Sidebar aria-label="Default sidebar example" className="homeLeftSideBar">
    //   <Sidebar.Items style={{ backgroundColor: 'teal'}}>
    //     <Sidebar.ItemGroup style={{ backgroundColor: 'orange' }}>
    //       <Sidebar.Item href="#" icon={HiChartPie} style={{ backgroundColor: 'blue' }}>
    //         Find Teammates
    //       </Sidebar.Item>
    //     </Sidebar.ItemGroup>
    //     <Sidebar.ItemGroup>
    //       <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
    //         Watch Clips
    //       </Sidebar.Item>
    //       <Sidebar.Item href="#" icon={HiInbox} label="3">
    //         Inbox
    //       </Sidebar.Item>
    //       <Sidebar.Item href="#" icon={HiUser}>
    //         Users
    //       </Sidebar.Item>
    //       <Sidebar.Item href="#" icon={HiShoppingBag}>
    //         Products
    //       </Sidebar.Item>
    //       <Sidebar.Item href="#" icon={HiArrowSmRight}>
    //         Felipe = Bad at league
    //       </Sidebar.Item>
    //       <Sidebar.Item href="/login" icon={HiTable}>
    //         Hi Phil
    //       </Sidebar.Item>
    //     </Sidebar.ItemGroup>
    //   </Sidebar.Items>
    // </Sidebar>
  );
};

export default SidebarComponent;

// FLOWBITE REACT DOCS: https://flowbite-react.com/docs/components/sidebar
