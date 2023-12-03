import React, { useState } from 'react';
import FileUpload from './FileUpload'; // Adjust the path based on your project structure
import './ProfilePage.css';
const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [about, setAbout] = useState('');
  const [posts, setPosts] = useState([]); // Assuming posts is an array of objects

  const handleFileChange = (file) => {
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  // Placeholder function to add posts
  const addPost = (postContent) => {
    const newPost = { content: postContent, id: posts.length + 1 };
    setPosts([...posts, newPost]);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Page</h1>
        <img src={profilePicture} alt="Profile" className="profile-picture"/>
        <FileUpload onFileChange={handleFileChange} />
        <textarea value={about} onChange={handleAboutChange} placeholder="About Me..." className="about-section"></textarea>
      </div>
      <div className="posts-section">
        {posts.map((post) => (
          <div key={post.id} className="post">
            {post.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
