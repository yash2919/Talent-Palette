import React, { useState } from 'react';
import FileUpload from './FileUpload'; // Adjust the path based on your project structure

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (file) => {
    // Handle the file as needed, e.g., upload to server or update state
    setProfilePicture(URL.createObjectURL(file));
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <img src={profilePicture} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
      <FileUpload onFileChange={handleFileChange} />
    </div>
  );
};

export default ProfilePage;
