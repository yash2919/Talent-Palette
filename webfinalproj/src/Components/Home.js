import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Header/Navbar"

function Home() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    async function fetchUserEmail() {
        try {
            const response = await fetch('http://localhost:3000', {
              method: 'GET',
              credentials: 'include', // Send cookies with the request
            });
        
            if (response.ok) {
              const data = await response.json();
              console.log(data.email); // Handle email data as needed
              
              //if()
            setUserEmail(data.email);

            } else {
              throw new Error('Failed to fetch email');
            }
          } catch (error) {
            console.error('Error fetching email:', error);
            // Handle errors
          }
    }
    

     fetchUserEmail();
  
  }, []);

  return (
    <div>
        <Navbar></Navbar>
      <h1>Welcome</h1>
      {userEmail ? (
        <p>User email: {userEmail}</p>
      ) : (
        <p>No user logged in or error fetching user email</p>
      )}
    </div>
  );
}

export default Home;
