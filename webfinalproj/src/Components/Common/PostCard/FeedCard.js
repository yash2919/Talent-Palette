// Card.js
import { useState } from "react";
import React, { useRef, useEffect } from "react";
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

const Card = ({
  userName,
  userImg,
  postContent,
  postUrl,
  mediaType,
  timestamp,
}) => {
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
          src={userImg}
          alt={`${userName}'s profile`}
        />
        <div className="user-details">
          <h4>{userName}</h4>
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
        <p>{postContent}</p>
      </div>
      {mediaType === "image" && postUrl && (
        <div className="card-picture mb-3">
          <img
            src={postUrl}
            alt={`${userName}'s post`}
            className="img-fluid rounded"
          />
        </div>
      )}
      {mediaType === "video" && postUrl && (
        <div className="card-video mb-3">
          <video controls className="img-fluid rounded">
            <source src={postUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
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
  userName: PropTypes.string.isRequired,
  userImg: PropTypes.string.isRequired,
  postContent: PropTypes.string.isRequired,
  postUrl: PropTypes.string,
  mediaType: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Card;
