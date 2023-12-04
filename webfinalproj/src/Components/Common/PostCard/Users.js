import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTimes, faEye } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./UserList.css";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const openUserProfile = (user) => {
    setSelectedUser(user);
  };

  const closeUserProfile = () => {
    setSelectedUser(null);
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <ul className="list-group">
        {users.map((user, index) => (
          <li key={index} className="list-group-item">
            <div
              onClick={() => openUserProfile(user)}
              className="d-flex align-items-center"
            >
              <img
                className="user-list-image"
                src={user.profilePicture}
                alt={`User ${index + 1}`}
              />
              <div className="user-details ms-3">
                <h3 className="user-name">{user.name}</h3>
                <div className="user-email d-flex align-items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="icon me-1" />
                  <span className="email">{user.email}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className={`user-profile-popup ${selectedUser ? "active" : ""}`}>
          <button
            className="btn btn-primary me-2"
            onClick={() => alert("View clicked!")}
          >
            <FontAwesomeIcon icon={faEye} /> View
          </button>
          <button className="btn btn-danger" onClick={closeUserProfile}>
            <FontAwesomeIcon icon={faTimes} /> Close
          </button>
        </div>
      )}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      profilePicture: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;
