// Admin.js

import React, { useState, useEffect } from 'react';
import "./Users.css";

function Admin() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await fetch("http://localhost:3000/user/getAll", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAllUsers(
            data.map((user) => ({
              userName: user.fullName,
              userImg: user.profileImage,
              userEmail: user.email,
              userRole: user.role,
            }))
          );
        } else {
          throw new Error("Failed to fetch User");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
        // Handle errors
      }
    }

    fetchAllUsers();
  }, []);

  const handleDeleteUser = async (email) => {
    // Confirm deletion with a popup
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
      return; // If not confirmed, do nothing
    }

    try {
      const response = await fetch('http://localhost:3000/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // User deleted successfully
        // Perform any other necessary actions or update state here
      } else {
        console.error(`Error deleting user: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <div>
        <h2>Profiles</h2>
        <div>
          {allUsers && allUsers.length > 0 ? (
            <div className="user-list-container">
              {allUsers.map((user, index) => (
                <div key={index} className="user-block">
                  <img
                    className="user-list-image"
                    src={user.userImg}
                    alt={`User ${index + 1}`}
                  />
                  <div className="user-details">
                    <h3 className="user-name">{user.userName}</h3>
                    <div className="user-email">
                      <span className="email">{user.userEmail}</span>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => handleDeleteUser(user.userEmail)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
