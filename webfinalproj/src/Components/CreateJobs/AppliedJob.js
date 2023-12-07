// AppliedJob.js
import React, { useState, useEffect } from "react";
import temImg from "./paint.jpeg";
import "./AppliedJob.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const AppliedJob = ({ jobTitle, applicants }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Fetch all users when the component mounts
    async function fetchAllUsers() {
      try {
        const response = await fetch("http://localhost:3000/user/getAll", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data, "This is data of all users to find applianats");
          setAllUsers(data);
        } else {
          throw new Error("Failed to fetch User");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    }

    fetchAllUsers();
  }, []);

  const getApplicantName = (applicant) => {
    // Find the user with matching userId or userEmail
    const user = allUsers.find((user) => user.email === applicant.userId);

    // Return the user's name or a default value
    return user ? user.fullName : "Unknown User";
  };

  const handleAcceptClick = (index) => {
    setSelectedItems([...selectedItems, { index, status: "accepted" }]);
  };

  const handleRejectClick = (index) => {
    setSelectedItems([...selectedItems, { index, status: "rejected" }]);
  };
  console.log(
    applicants,
    "This the list of appliants coming from View applied"
  );
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
                {getApplicantName(applicant)}
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
