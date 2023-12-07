import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Navbar from "./Header/Navbar";
import { useNavigate } from "react-router-dom";
import Card from "./Common/PostCard/FeedCard";
import image3 from "../assets/images/artist.jpg";
import CreatePost from "../Components/Post";
import UserList from "./Common/PostCard/Users";
import "./Home.css";
import PersonCard from "../Components/PersonCards";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  async function fetchAllPosts() {
    try {
      const response = await fetch(`${BASE_URL}/post/getallposts`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAllPosts(
          data.post.map((post) => ({
            userName: post.userName ? post.userName : post.email,
            userImg: post.userImg ? post.userImg : image3,
            postName: post.postName,
            postimgUrl: post.postimgUrl,
            postType: post.postType ? post.postType : "image",
            timestamp: post.timestamp ? post.timestamp : "2023-12-05T12:34:56",
            _id: post._id,
          }))
        );
      } else {
        throw new Error("Failed to fetch email");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAllUsers() {
    try {
      const response = await fetch(`${BASE_URL}/user/getAll`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAllUsers(
          data.map((post) => ({
            userName: post.fullName,
            userImg: post.profileImage,
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
    }
  }

  async function fetchProfile(email) {
    try {
      const response = await fetch(`${BASE_URL}/user/profile/${email}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const response = await fetch(`${BASE_URL}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.valid === false) {
            navigate("/");
          } else {
            setUserEmail(data.email);
            fetchProfile(data.email);
          }
        } else {
          throw new Error("Failed to fetch email");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    }

    async function fetchData() {
      try {
        setLoading(true);
        await fetchUserEmail();
        await fetchAllPosts();
        await fetchAllUsers();
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar
        userImg={profile?.profileImage ? profile.profileImage : image3}
      />
      <div className="home-container">
        <div className="main-content">
          <div className="person-card-container">
            <PersonCard
              userName={profile ? profile.fullName : userEmail}
              userImg={profile?.profileImage ? profile.profileImage : image3}
              userEmail={userEmail}
              userRole={profile?.role?profile.role : "User"} // You may need to fetch the user role from the server
            />
          </div>

          <div>
            <CreatePost
              userProfilePicture={
                profile?.profileImage ? profile.profileImage : image3
              }
              onPostCreated={fetchAllPosts}
            />

            {loading ? (
              <div className="loader-container">
                <ClipLoader css={override} size={50} color={"#123abc"} />
              </div>
            ) : allPosts && allPosts.length > 0 ? (
              allPosts
                .slice()
                .reverse()
                .map((post, index) => (
                  <Card
                    key={index}
                    userName={post.userName}
                    userImg={post.userImg}
                    postContent={post.postName}
                    postUrl={post.postimgUrl}
                    mediaType={post.postType}
                    timestamp={post.timestamp}
                    email={post.email}
                  />
                ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
        <div className="user-list">
          {loading ? (
            <div className="loader-container">
              <ClipLoader css={override} size={50} color={"#123abc"} />
            </div>
          ) : allUsers && allUsers.length > 0 ? (
            <UserList users={allUsers} />
          ) : (
            <p>No users available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
