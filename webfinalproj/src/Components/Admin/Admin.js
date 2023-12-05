import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [profiles, setProfiles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);

  // Fetch Profiles, Jobs, and Posts on component mount
  useEffect(() => {
    fetchProfiles();
    fetchJobs();
    fetchPosts();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/getAll');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };
  
  
const fetchJobs = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/jobs');
    setJobs(response.data);
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/posts');
    setPosts(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};


  // CRUD operations for profiles

  const createProfile = async (profileData) => {
    await axios.post('http://localhost:3000/user/create', profileData);
    fetchProfiles();
  };
  const updateProfile = async (profileId, updatedData) => {
    await axios.put('http://localhost:3000/user/edit', updatedData); // Ensure this matches your API
    fetchProfiles();
  };
  const deleteProfile = async (profileId) => {
    await axios.delete('http://localhost:3000/user/delete', { data: { id: profileId } }); // Sending ID in the body
    fetchProfiles();
  };
  
  // CRUD operations for jobs
  const createJob = async (jobData) => {
    try {
      await axios.post('http://localhost:3000/api/jobs', jobData);
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };
  
  const updateJob = async (jobId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/api/jobs/${jobId}`, updatedData);
      fetchJobs();
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:3000/api/jobs/${jobId}`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  
  //post ops
  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
  
      <div>
        <h2>Profiles</h2>
        {profiles.map(profile => (
          <div key={profile._id} className="profile">
            <img src={profile.profileImage} alt="Profile" />
            <h3>{profile.fullName}</h3>
            <p>Email: {profile.email}</p>
            <p>About: {profile.about}</p>
            <p>Skills: {profile.skills}</p>
            <p>Gigs Info: {profile.gigsInfo}</p>
            <button onClick={() => handleEditProfile(profile._id)}>Edit</button>
            <button onClick={() => handleDeleteProfile(profile._id)}>Delete</button>
          </div>
        ))}
      </div>
  
      <div>
        <h2>Jobs</h2>
        {jobs.map(job => (
          <div key={job._id} className="job">
            <h3>{job.jobName}</h3>
            <p>Description: {job.jobDescription}</p>
            <button onClick={() => handleEditJob(job._id)}>Edit</button>
            <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
          </div>
        ))}
      </div>
  
      <div>
        <h2>Posts</h2>
        {posts.map(post => (
          <div key={post._id} className="post">
            <h3>{post.postTitle}</h3>
            <p>{post.postContent}</p>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
  
}

        export default Admin;
