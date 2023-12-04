import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Header/Navbar";
import { useNavigate } from "react-router-dom";
import Card from "./Common/PostCard/FeedCard";
import image3 from "../assets/images/artist.jpg";
import CreatePost from "../Components/Post";
import UserList from "./Common/PostCard/Users";
import "./Home.css";

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
  const [allPosts, setallPosts] = useState([]);
  const [allUsers, setallUsers] = useState([]);

  async function fetchallPosts() {
    try {
      const response = await fetch("http://localhost:3000/post/getallposts", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        // if(data!=null)
        setallPosts(
          data.post.map((post) => ({
            // email: post.email,
            userName: post.userName ? post.userName : post.email,
            userImg: post.userImg ? post.userImg : image3,
            postName: post.postName,
            postimgUrl: post.postimgUrl,
            postType: post.postType ? post.postType : "img",
            timestamp: post.timestamp ? post.timestamp : "2023-12-05T12:34:56",
            _id: post._id,
          }))
        );

        console.log(data.post[0].timestamp);
      } else {
        throw new Error("Failed to fetch email");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
      // Handle errors
    }
  }

  async function fetchallUsers() {
    try {
      const response = await fetch("http://localhost:3000/user/getAll", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // if(data!=null)
        setallUsers(
          data.map((post) => ({
            userName: post.fullName,
            userImg: image3,
            userEmail: post.email,
            userRole: post.role,
            _id: post._id,
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

  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const response = await fetch("http://localhost:3000", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
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

    async function fetchallPosts() {
      try {
        const response = await fetch("http://localhost:3000/post/getallposts", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          // if(data!=null)
          setallPosts(
            data.post.map((post) => ({
              // email: post.email,
              userName: post.userName ? post.userName : post.email,
              userImg: post.userImg ? post.userImg : image3,
              postName: post.postName,
              postimgUrl: post.postimgUrl,
              postType: post.postType ? post.postType : "image",
              timestamp: post.timestamp
                ? post.timestamp
                : "2023-12-05T12:34:56",
              _id: post._id,
            }))
          );

          console.log(data.post[0].timestamp);
        } else {
          throw new Error("Failed to fetch email");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
        // Handle errors
      }
    }

    fetchUserEmail();
    fetchallPosts();
    fetchallUsers();
  }, []);
  console.log(allPosts);
  console.log("Users");
  console.log(allUsers);

  
  return (
    <div>
      <Navbar></Navbar>
      <div className="home-container">
        <div className="main-content">
          <div>
            <CreatePost
              userProfilePicture={image3}
              onPostCreated={fetchallPosts}
            />

            {/* <h1>{allPosts[0]}</h1> */}
         
        {allPosts && allPosts.length > 0 ? (
  allPosts.slice().reverse().map((post, index) => (
    <Card
      key={index}
      userName={post.userName}
      userImg={post.userImg}
      postContent={post.postName}
      postUrl={post.postimgUrl}
      mediaType={post.postType}
      timestamp={post.timestamp}
    />
  ))
) : (
  <p>Loading...</p>
)}

      

            {/* {hourdata && hourdata[1] ? (
            hourdata[days.indexOf(day)].map((dayData, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                <WeatherCard
                  day={dayData.day || ""}
                  highTemp={dayData.highTemp || ""}
                  lowTemp={dayData.lowTemp || ""}
                  weatherType={dayData.icon || ""}
                />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )} */}
          </div>
        </div>
        <div className="user-list">
          {allUsers && allUsers.length > 0 ? (
            <UserList users={allUsers} />
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
