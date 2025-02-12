import React, { useState,useRef,useEffect  } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import SidebarLogo from "../../assets/images/logo.svg";
import { SlSupport } from "react-icons/sl";
import { RiHomeLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiStar } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import DashboardIcon from "../../assets/images/download.jpeg"
import IconArchive from "../../assets/images/icon-archive.svg"
import IconClipboard from "../../assets/images/icon-clipboard.svg"
import IconHelp from "../../assets/images/icon-help-circle.svg"

import NavItem from "./NavItem";
const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  // Handle clicks outside of the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the sidebar and sidebar is open
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false); // Close the sidebar
      }
    };

    // Attach the click event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);
  return (
    <div className="">
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""} bg-color`}>
        <button className="sidebar-toggle-button " onClick={toggleSidebar}>
          {isSidebarOpen ? "X" : "☰"}
        </button>
        <div className="sidebar-content">
          {/* Add your navigation items here */}
          <div className="nav-item">
            <div className="border-b border-[#FFFFFF4D]">
              <img className="p-3 " src={SidebarLogo} alt="" />
            </div>

            <div className="nav-item mt-3">
              <NavItem
                to="/dashboard"
                icon={DashboardIcon}
                text="Dashboard"
                location={location}
              />
              <div>
                <NavItem
                  to="/resources-management"
                  icon={IconArchive}
                  text="Resources management"
                  location={location}
                />
              </div>

              <NavItem
                to="/feedback-survey"
                icon={IconClipboard}
                text="Feedback survey"
                location={location}
              />
              <NavItem
                to="/contact-form"
                icon={IconHelp}
                text="Contact form"
                location={location}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
