// Card.js
import { useState } from "react";
import React, { useRef, useEffect } from "react"; // Added useRef and useEffect
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

import "./Card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Card = ({ user, content, timestamp }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="card p-3">
      <div className="card-header d-flex align-items-center mb-3">
        <img
          className="profile-picture rounded-circle"
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
        />
        <div className="user-details">
          <h4>{user.name}</h4>
          <p>{timestamp}</p>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        {showMenu && (
          <div className="menu-list" ref={menuRef}>
            <ul>
              <li>View Profile</li>
              <li>More</li>
            </ul>
          </div>
        )}
      </div>
      <div className="card-content mb-3">
        <p>{content}</p>
      </div>
      <div className="card-picture mb-3">
        <img
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
          className="img-fluid rounded"
        />
      </div>
      <div className="card-actions d-flex">
        <button className="btn btn-outline-primary btn-lg me-3">
          <FontAwesomeIcon icon={faThumbsUp} /> Like
        </button>
        <button className="btn btn-outline-primary btn-lg me-3">
          <FontAwesomeIcon icon={faComment} /> Comment
        </button>
        <button className="btn btn-outline-primary btn-lg">
          <FontAwesomeIcon icon={faShare} /> Share
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Card;
