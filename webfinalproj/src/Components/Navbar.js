import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faUser,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const menuData = [
    { label: "Home", path: "/" },
    { label: "Profession", path: "/profession" },
    { label: "My Profile", path: "/profile" },
    { label: "Sign In or Register", path: "/login" },
  ];
  const NavItem = ({ to, icon, label }) => (
    <li className="nav-item">
      <Link to={to} className="nav-link">
        <FontAwesomeIcon icon={icon} className="icon" />
        <span>{label}</span>
      </Link>
    </li>
  );
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <NavItem to="/" icon={faHome} label="Home" />
        <NavItem to="/profession" icon={faBriefcase} label="Profession" />
        <NavItem to="/profile" icon={faUser} label="My Profile" />
        <NavItem to="/login" icon={faSignInAlt} label="Sign In or Register" />
      </ul>
    </nav>
  );
}

export default Navbar;
