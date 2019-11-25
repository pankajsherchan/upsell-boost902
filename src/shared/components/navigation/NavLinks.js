import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
const NavLinks = props => {
  return (
    <div className="nav-links">
      <NavLink to="/" exact>
        Dashboard
      </NavLink>
      <NavLink to="revenue-summary">Revenue</NavLink>
      <NavLink to="comparison">Comparison</NavLink>
      <NavLink to="performance">Performance</NavLink>
      <NavLink to="posts">Posts</NavLink>
      <NavLink to="signup">Signup</NavLink>
    </div>
  );
};

export default NavLinks;