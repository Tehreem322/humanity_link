import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { Fragment } from "react";
import userImg from "../../assets/images/user-img.svg";
import LogoutSvg from "../../assets/images/Logout.svg";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    // Optional: Clear other items if needed
    // localStorage.clear();
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div>
      <div
        style={{ "boxShadow": "0px 2px 7px 0px #CBD2E073" }}
        className="md:sticky bg-white h-16 md:h-[74px]"
      >
        <div className="flex flex-wrap-reverse pr-5 gap-3 md:gap-0 justify-end md:justify-between items-center py-4 ">
          <div className="md:ml-[17.5rem] relative">
            <div className="relative">
              <span className="absolute  text-[#D1D5DB] top-[13px] left-4 ">
                <IoSearch />
              </span>
              <input
                className="border border-[#D1D5DB] bg-[#F3F4F6] w-[150px] md:w-[300px] py-[7px] rounded-md px-10 outline-none"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>

          <div className="flex gap-5  md:gap-5 items-center">
            <button 
              onClick={handleLogout}
              className="px-3 md:px-5 flex items-center gap-2 secondary-heading4 border-2 border-[#1371A8] py-2 rounded-md bg-[#B0DCFF] focus:outline-none hover:bg-[#9ac9ef] transition-colors"
            >
              <span>
                <img src={LogoutSvg} alt="" />
              </span>
              Logout
            </button>
           
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={userImg} alt="" />
                </MenuButton>
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;