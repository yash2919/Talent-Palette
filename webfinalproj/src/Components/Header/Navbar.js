// Navbar.js

import image3 from "../Header/talent.png";
import image2 from "../Header/artist.jpg";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faHome,
  faBriefcase,
  faUser,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const SearchBox = () => (
    <li className="nav-item">
      <div className="search-box">
        <input type="text" placeholder=" Search" className="search-input" />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
    </li>
  );

  const menuData = [
    { label: "Home", path: "/home" },
    { label: "Profession", path: "/profession" },
    { label: "Contact", path: "/contact" },
    { label: "Profile", path: "/profile" },
    { label: "Logout", path: "/" },
  ];

  const NavItem = ({ to, icon, label, onClick }) => {
    const isActive = location.pathname === to;

    const itemStyle = {
      color: isActive ? "black" : "grey", // Change to the desired text color
    };

    const iconStyle = {
      color: isActive ? "black" : "grey", // Change to the desired icon color
    };

    if (label === "Logout") {
      return (
        <li className="nv-it" style={itemStyle}>
          <button className="nv-link" onClick={onClick}>
            <FontAwesomeIcon icon={icon} className="icn" style={iconStyle} />
            <span>{label}</span>
          </button>
        </li>
      );
    } else if (label === "Profile") {
      return (
        <li className="nv-it" style={itemStyle}>
          <Link to={to} className="nv-link">
            <img src={image2} alt="My Profile" className="pfl-icn" />
            <span>{label}</span>
          </Link>
        </li>
      );
    } else {
      return (
        <li className="nv-it" style={itemStyle}>
          <Link to={to} className="nv-link">
            <FontAwesomeIcon icon={icon} className="icn" style={iconStyle} />
            <span>{label}</span>
          </Link>
        </li>
      );
    }
  };

  const logout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.status;
      if (data === 200) {
        navigate("/");
      } else {
        alert(`Logout failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout.");
    }
  };

  return (
    <nav className="nvr">
      <div className="lg-cntnr">
        <span className="ws-nm">Talent Palette</span>
      </div>

      <ul className="nv-lst">
        <NavItem to="/home" icon={faHome} label="Home" />
        <NavItem to="/profession" icon={faBriefcase} label="Profession" />
        <NavItem to="/contact" icon={faUser} label="Contact" />
        <NavItem to="/profile" icon={faUser} label="Profile" />
        <NavItem onClick={logout} icon={faSignInAlt} label="Logout" />
      </ul>
    </nav>
  );
}

export default Navbar;
