// CreateJobForm1.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadWidget from "../Common/UploadWidget/UploadWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./CreateJob.css"; // Import the CSS file for CreateJobForm1

const CreateJobForm1 = () => {
  const [email, setEmail] = useState("");
  const [jobName, setJobName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobimgUrl, setJobImgUrl] = useState("");
  const [jobType, setJobType] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [preview, setPreview] = useState(false);
  const [postType, setpostType] = useState("");

  const preimageStyle = {
    maxWidth: "500px",
    maxHeight: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const videoStyle = {
    width: "100%",
    height: "auto",
    maxWidth: "400px",
  };

  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const response = await fetch("http://localhost:3000", {
          method: "GET",
          credentials: "include",
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
      }
    }

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/jobs/create", {
        email,
        jobName,
        jobDesc,
        jobimgUrl,
        jobType,
      });
      alert("Job created:", response.data);
      console.log("Job created:", response.data);

      setJobName("");
      setJobDesc("");
      setJobImgUrl("");
      setJobType("");
      setPreview(false);
    } catch (error) {
      alert("Error creating job:", error.message);
      console.error("Error creating job:", error.message);
    }
  };

  const handleOntTest = (result) => {
    if (result != null) {
      setPreview(true);
      setJobImgUrl(result.secure_url);
      console.log(result.secure_url);
      setpostType(result.resource_type);
    }
  };

  return (
    <div className={`create-job-container${preview ? " preview" : ""}`}>
      {preview ? (
        <div>
          {postType === "image" ? (
            <div>
              <img
                src={jobimgUrl}
                className="dropdownimg"
                alt="Preview"
                id="imagePreview"
                style={preimageStyle}
              ></img>
            </div>
          ) : (
            <div className="video-container">
              <video controls style={videoStyle}>
                <source src={jobimgUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      ) : (
        <>
          <h4 className="h444">Post a Job </h4>
          <UploadWidget
            className="jobscomp"
            onTest={handleOntTest}
          ></UploadWidget>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="jobs"
          placeholder="Job Name"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />
        <br></br>
        <textarea
          type="text"
          className="jobsdes"
          placeholder="Job Description"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          className="jobs"
          placeholder="Job Type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        />
        <br></br>

        <button className="btn123" type="submit">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="post-button-icon"
            style={{ fontSize: "30px" }}
          />
        </button>
      </form>
    </div>
  );
};

export default CreateJobForm1;
