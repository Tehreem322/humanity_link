import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, icon, text, onClick }) => {
  const location = useLocation().pathname;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${
        location === to && "rounded-lg bg-[#006679] text-white"
      } mb-4`}
    >
      <div className="">
        <Link
          to={to}
          className="flex items-center justify-between p-2 w-full rounded-lg hover:bg-[#006679]  primary-para hover:text-white"
          onClick={handleClick}
        >
          <div className="flex items-center  gap-3">
            <div>
              <span
                style={{ fontSize: "1.2rem" }}
                className={`${
                  location === to && "rounded-lg bg-[#006679] text-white"
                }`}
              >
                <img src={icon} alt="" />
              </span>
            </div>
            <span className={`${location === to && " text-white"}`}>
              {text}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavItem;
