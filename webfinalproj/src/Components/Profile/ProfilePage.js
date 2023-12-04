import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Header/Navbar';
import Card from '../Common/PostCard/FeedCard';
import image3 from '../../assets/images/artist.jpg';
import CreatePost from '../../Components/Post';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const samplePost = {
    user: {
      name: "John Doe",
      profilePicture: image3,
    },
    content:
      "Algorithms are the building blocks of coding! As programmers, it's crucial to have a solid understanding of these powerful tools 🚀. Let's take a moment to appreciate some of the most important algorithms that shape our coding journeys. Join me on this emoji-filled adventure!",
    timestamp: "2 hours ago",
  };
  const [artistProfile, setArtistProfile] = useState({
    fullName: '',
    about: '',
    skills: '',
    profileImage: '',
    gigsInfo: ''
  });

  useEffect(() => {
    // Flag to check if the component is still mounted
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const response = await axios.get('/user/profile');

        if (isMounted) {
          setArtistProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);

        // Check if the component is still mounted before navigating
        if (isMounted) {
          // Instead of navigating to '/', you might want to handle the error differently
          // For now, let's log the error and leave the user on the current page
          console.error('Navigation aborted. Component might be unmounted.');
        }
      }
    };

    fetchProfile();

    // Cleanup function to set the isMounted flag to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await axios.put('/user/profile', artistProfile);
      alert('Profile updated successfully!');
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtistProfile({ ...artistProfile, [name]: value });
  };

  return (
    <div>
      <Navbar />
      {artistProfile && (
        <div className="profile-container">
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={artistProfile.fullName}
              onChange={handleChange}
            />
          ) : (
            <h1>{artistProfile.fullName}</h1>
          )}
          {editMode ? (
            <input
              type="text"
              name="profileImage"
              value={artistProfile.profileImage}
              onChange={handleChange}
            />
          ) : (
            <img
              src={artistProfile.profileImage || image3}
              alt={`${artistProfile.fullName}'s Profile`}
              className="profile-image"
            />
          )}
          <div className="about-section">
            <h2>About</h2>
            {editMode ? (
              <textarea
                name="about"
                value={artistProfile.about}
                onChange={handleChange}
              />
            ) : (
              <p>{artistProfile.about}</p>
            )}
          </div>
          <div className="skills-section">
            <h2>Skills</h2>
            {editMode ? (
              <input
                type="text"
                name="skills"
                value={artistProfile.skills}
                onChange={handleChange}
              />
            ) : (
              <p>{artistProfile.skills}</p>
            )}
          </div>
          <div className="gigs-section">
            <h2>Upcoming Gigs</h2>
            {editMode ? (
              <input
                type="text"
                name="gigsInfo"
                value={artistProfile.gigsInfo}
                onChange={handleChange}
              />
            ) : (
              <p>{artistProfile.gigsInfo}</p>
            )}
          </div>
          {/* Edit and Save Buttons */}
          {editMode ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
          <div className="posts-section">
            <h2>Posts Shared</h2>
            {/* ... post mapping */}
          </div>
        </div>
      )}
      {
        <div>
          <CreatePost userProfilePicture={image3} />
          <Card {...samplePost} />
        </div>}
    </div>
  );
};

export default PortfolioPage;
