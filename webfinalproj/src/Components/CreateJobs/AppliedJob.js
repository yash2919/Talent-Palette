// AppliedJob.js
import React, { useState } from "react";
import temImg from "./paint.jpeg";
import "./AppliedJob.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const AppliedJob = ({ jobTitle, applicants }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAcceptClick = (index) => {
    setSelectedItems([...selectedItems, { index, status: "accepted" }]);
  };

  const handleRejectClick = (index) => {
    setSelectedItems([...selectedItems, { index, status: "rejected" }]);
  };

  return (
    <div className="random-container">
      {/* Left side: List of users */}
      <div className="random-list">
        <h2>{jobTitle}</h2>
        <ul>
          {applicants.map((applicant, index) => (
            <li
              key={index}
              className={`random-list-item ${
                selectedItems.some(
                  (item) => item.index === index && item.status === "accepted"
                )
                  ? "accepted"
                  : selectedItems.some(
                      (item) =>
                        item.index === index && item.status === "rejected"
                    )
                  ? "rejected"
                  : ""
              }`}
            >
              <div className="random-button-container">
                <img
                  src={temImg}
                  alt={`${applicant.name}'s profile`}
                  className="user1-profile-img"
                />
                {applicant.name}
                <button
                  className="random-accept-button"
                  onClick={() => handleAcceptClick(index)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="random-reject-button"
                  onClick={() => handleRejectClick(index)}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppliedJob;
