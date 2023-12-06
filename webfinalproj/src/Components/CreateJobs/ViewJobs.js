import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadWidget from "../Common/UploadWidget/UploadWidget";
import Navbar from "../Header/Navbar";
import CreateJobForm1 from "./CreateJobForm";
import "./ViewJobs.css";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // Track the selected job

  const [email, setEmail] = useState("");
  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const response = await fetch("http://localhost:3000", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.valid === true) {
            setEmail(data.email);
          }
        } else {
          throw new Error("Failed to fetch email");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/jobs/getalljobs?email=${email}`
        );
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      }
    };

    fetchUserEmail();
    if (email) fetchJobs();
  }, [email, jobs]);

  const handleJobClick = (job) => {
    // Set the selected job when a job is clicked
    setSelectedJob(job);
  };

  const handleCloseClick = () => {
    // Clear the selected job when the close button is clicked
    setSelectedJob(null);
  };
  console.log("This is to check Jobs", jobs);
  return (
    <div className="maincomp">
      <div style={{ display: "flex", marginTop: "30px" }}>
        {/* Left side: List of jobs */}
        <div style={{ flex: 1 }}>
          <ul>
            {jobs.map((job) => (
              <li
                key={job._id}
                className="job-list-item"
                onClick={() => handleJobClick(job)}
              >
                <p>{job.jobName}</p>
                {/* Display other job details as needed */}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Job details */}
        <div className="right-side" style={{ flex: 2 }}>
          {selectedJob && (
            <div>
              <h2 style={{ textAlign: "center", fontSize: "25px" }}>
                Job Details
              </h2>
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Name : {selectedJob.jobName}
              </p>
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Description :{selectedJob.jobDesc}
              </p>
              <img
                className="job-post-img"
                src={selectedJob.jobimgUrl}
                alt={`${selectedJob.jobName}'s post`}
              />
              <div className="job-buttons">
                <button className="close-button">Edit</button>
                <button onClick={handleCloseClick} className="close-button">
                  Close
                </button>
              </div>
              {/* Display other job details as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewJobs;
