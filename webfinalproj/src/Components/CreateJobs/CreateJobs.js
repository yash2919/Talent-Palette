import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed: npm install axios
import UploadWidget from '../Common/UploadWidget/UploadWidget';
import Navbar from '../Header/Navbar';

const CreateJobForm = () => {
  const [email, setEmail] = useState('');
  const [jobName, setJobName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobimgUrl, setJobImgUrl] = useState('');
  const [jobType, setJobType] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [preview,setPreview] =useState(false);
  const [postType, setpostType] = useState("");
  const preimageStyle = {
    maxWidth: '500px',
    maxHeight: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const videoStyle = {
    width: '100%', // Set your desired width
    height: 'auto', // The 'auto' value maintains the aspect ratio
    maxWidth: '400px', // Set your desired max-width
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
          console.log(data);
          if (data.valid === false) {
          } else setEmail(data.email);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/jobs/create', {
        email,
        jobName,
        jobDesc,
        jobimgUrl,
        jobType
      });
      alert('Job created:', response.data);
      console.log('Job created:', response.data);
      // Handle success message or any other actions upon successful job creation

      // Clear form fields after successful submission
    //   setEmail('');
      setJobName('');
      setJobDesc('');
      setJobImgUrl('');
      setJobType('');
      setPreview(false);
    } catch (error) {
        alert('Error creating job:', error.message);
      console.error('Error creating job:', error.message);
      // Handle error, show error message to the user
    }
  };
  const handleOntTest = (result) => {
    if (result != null) {
      setPreview(true);
      // console.log("url"+result);
      setJobImgUrl(result.secure_url);
      console.log(result.secure_url);
      setpostType(result.resource_type);
    }
  };

  return (
    <div>
          <label>Job Image</label>
        <UploadWidget onTest={handleOntTest}></UploadWidget>
        {preview?<div>
          {
            postType==="image"?<div>
              <img src={jobimgUrl} alt="Preview" id="imagePreview" style={preimageStyle}></img>
            </div> :
                <div className="video-container">
                <video controls style={videoStyle}>
                  <source src={jobimgUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
          }
        </div> :<div></div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Name"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Job Description"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        <br></br> <br></br>
      
        <br></br> <br></br>
        <input
          type="text"
          placeholder="Job Type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        />
       
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [email, setEmail] = useState('');
  useEffect(() => {
    async function fetchUserEmail() {
        try {
          const response = await fetch("http://localhost:3000", {
            method: "GET",
            credentials: "include", // Send cookies with the request
          });
  
          if (response.ok) {
            const data = await response.json();
            if(data.valid===true){
                // setEmail(data.email);
                console.log(data.email);
    
                setEmail(data.email);
            }
          } else {
            throw new Error("Failed to fetch email");
          }
        } catch (error) {
          console.error("Error fetching email:", error);
          // Handle errors
        }
      }
  
     
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/jobs/getalljobs?email=${email}`);
      //  console.log(JSON.parse(response));
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
        // Handle error, show error message to the user
      }
    };

    fetchUserEmail();
    if(email) fetchJobs();
  }, [email,jobs]);

  return (
    <div>
      <h2>Jobs List</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <p>{job.jobName}</p>
            <p>{job.jobDesc}</p>
            <p>Add button to edit job and view all applicants</p>
            {/* Display other job details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const createjobs = () => {
  return (
    <div>
        <Navbar></Navbar>
        <h1>Create Jobs</h1>
      <CreateJobForm />
      <br></br><br></br>
      <h1>My created Jobs</h1>
      <ViewJobs />
    </div>
  );
};

export default createjobs;
