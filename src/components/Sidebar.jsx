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
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <div className="sidebar-item">
            <Sidebar.Item href="#" icon={HiChartPie}>
              Find Teammates
            </Sidebar.Item>
          </div>
          <div className="sidebar-item">
            <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
              Watch Clips
            </Sidebar.Item>
          </div>
          <div className="sidebar-item">
            <Sidebar.Item href="#" icon={HiInbox} label="3">
              Inbox
            </Sidebar.Item>
          </div>
          <div className="sidebar-item">
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
          </div>
          <div className="sidebar-item">
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
          </div>
          <div className="sidebar-item">
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Felipe = Bad at league
            </Sidebar.Item>
          </div>
          <div className="sidebar-item">
            <Sidebar.Item href="#" icon={HiTable}>
              Hi Phil
            </Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarComponent;

// FLOWBITE REACT DOCS: https://flowbite-react.com/docs/components/sidebar
