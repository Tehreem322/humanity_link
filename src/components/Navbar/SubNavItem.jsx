// SubNavItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const SubNavItem = ({ to, icon, text }) => {
  return (
    <div className="sub-nav-item">
      <Link to={to} className="d-flex align-items-center">
        {icon && <span className="sub-nav-icon">{icon}</span>}
        <span className="sub-nav-text">{text}</span>
      </Link>
    </div>
  );
};

export default SubNavItem;
