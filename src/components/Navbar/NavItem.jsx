import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, icon, text, onClick, subItems }) => {
  const location = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    // Toggle the open state if there are subItems
    if (subItems && subItems.length > 0) {
      setIsOpen(!isOpen);
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
          className="flex items-center justify-between p-2 w-full rounded-lg hover:bg-[#006679] primary-para hover:text-white"
          onClick={handleClick}
        >
          <div className="flex items-center gap-3">
            <div>
              <span
                style={{ fontSize: "1.2rem" }}
                className={`${
                  location === to && "rounded-lg bg-[#006679] text-white"
                }`}
              >
                {typeof icon === "string" ? (
                  <img src={icon} alt={text} />
                ) : (
                  <span className="text-lg">{icon}</span>
                )}
              </span>
            </div>
            <span className={`${location === to && " text-white"}`}>
              {text}
            </span>
            {/* Display the arrow for sub-items */}
            {subItems && subItems.length > 0 && (
              <MdKeyboardArrowDown
                className={`${
                  isOpen ? "transform rotate-180" : ""
                } transition-transform`}
              />
            )}
          </div>
        </Link>
        {/* Render sub-items if isOpen is true */}
        {isOpen && subItems && subItems.length > 0 && (
          <div className="pl-6">
            {subItems.map((subItem, index) => (
              <NavItem
                key={index}
                to={subItem.to}
                icon={subItem.icon}
                text={subItem.text}
                location={location}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavItem;
