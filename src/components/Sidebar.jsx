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

// THIS IS A TEMPLATE FOR NOW - WE WILL FILL OUT CORRECTLY WHEN WE SET UP APP NAVIGATION FLOW
const SidebarComponent = () => {
  return (
    // Obviously later rewrite this to dynamically import
    // and fill from their friends list/ groups list/ clan list, just a placeholder for now
    <div className="homeLeftSideBarWrapper">
      <div className="homeLeftSideBarBreak">
        <div className="homeLeftSideBarGroupName">
          Friends
        </div>
        <div className="homeLeftSideBarGroupSearch">
          Search Bar
        </div>
        <div className="homeLeftSideBarGroupAdd">
          Add Friend
        </div>
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
