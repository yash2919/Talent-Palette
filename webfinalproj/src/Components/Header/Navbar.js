import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const menuData = [
    { label: "Home", path: "/home" },
    { label: "Profession", path: "/profession" },
    { label: "My Profile", path: "/profile" },
    { label: "Sign Out", path: "/" },
  ];
  const NavItem = ({ to, icon, label, onClick }) => {
    if (label === "Sign Out") {
      return (
        <li className="nav-item">
          <button className="nav-link" onClick={onClick}>
            <FontAwesomeIcon icon={icon} className="icon" />
            <span>{label}</span>
          </button>
        </li>
      );
    } else {
      return (
        <li className="nav-item">
          <Link to={to} className="nav-link">
            <FontAwesomeIcon icon={icon} className="icon" />
            <span>{label}</span>
          </Link>
        </li>
      );
    }
  };
  

  
  const logout = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
        // body: JSON.stringify({ email, password }),
      });

      const data = await response.status;
      if (data===200) {
        //  alert(data.message);
        navigate("/");
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <NavItem to="/home" icon={faHome} label="Home" />
        <NavItem to="/profession" icon={faBriefcase} label="Profession" />
        <NavItem to="/profile" icon={faUser} label="My Profile" />
        <NavItem to="/profile" icon={faUser} label="Contact Us" />
        <NavItem  onClick={logout} icon={faSignInAlt} label="Sign Out" />
      </ul>
    </nav>
  );
}

export default Navbar;
