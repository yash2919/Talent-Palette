import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Header/Navbar";
import { useNavigate } from "react-router-dom";
import Card from "./Common/PostCard/FeedCard";
import image3 from "../assets/images/artist.jpg";
import CreatePost from "../Components/Post";


function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const samplePost = {
    user: {
      name: "John Doe",
      profilePicture: image3,
    },
    content:
      "Algorithms are the building blocks of coding! As programmers, it's crucial to have a solid understanding of these powerful tools 🚀. Let's take a moment to appreciate some of the most important algorithms that shape our coding journeys. Join me on this emoji-filled adventure!",
    timestamp: "2 hours ago",
  };

  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const response = await fetch("http://localhost:3000", {
          method: "GET",
          credentials: "include", // Send cookies with the request
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data); // Handle email data as needed

          //if()
          if (data.valid === false) {
            navigate("/");
          } else setUserEmail(data.email);
        } else {
          throw new Error("Failed to fetch email");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
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
      <div>
        <CreatePost userProfilePicture={image3} />
        <Card {...samplePost} />
      </div>
    </div>
  );
}

export default Home;
