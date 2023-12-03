// CreatePost.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faVideo,
  faFile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./Post.css"; // Import the CSS file

const CreatePost = ({ userProfilePicture }) => {
  const [mediaType, setMediaType] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [postContent, setPostContent] = useState("");

  const openMediaModal = (type) => {
    setMediaType(type);
  };

  const closeMediaModal = () => {
    setMediaType(null);
  };

  const handleFileUpload = (files) => {
    // Process the uploaded files, e.g., save them to state
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    closeMediaModal();
  };

  const handlePost = () => {
    // Implement logic to handle the post, e.g., send data to the server
    console.log("Post Data:", {
      userProfilePicture,
      uploadedFiles,
      postContent,
    });
    // Reset state after posting
    setUploadedFiles([]);
    setPostContent("");
  };

  return (
    <div className="create-post-container">
      <div className="user-image-container">
        <img
          className="user-image"
          src={userProfilePicture}
          alt="User Profile"
        />
        {"       "}
        <h3 className="want-to-post">Want to Post Something ? </h3>
      </div>
      <div className="post-box-container">
        <textarea
          className="post-box"
          placeholder="Start a post..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
      </div>
      <div className="media-buttons">
        <button
          className="media-button"
          onClick={() => openMediaModal("image")}
        >
          <FontAwesomeIcon icon={faImage} className="media-type-icon" />
          Media
        </button>
        <button
          className="media-button"
          onClick={() => openMediaModal("video")}
        >
          <FontAwesomeIcon icon={faVideo} className="media-type-icon" />
          Video
        </button>
        <button className="media-button" onClick={() => openMediaModal("file")}>
          <FontAwesomeIcon icon={faFile} className="media-type-icon" />
          File
        </button>
        <button className="media-button post-button" onClick={handlePost}>
          <FontAwesomeIcon icon={faPaperPlane} className="media-type-icon" />
          Post
        </button>
      </div>
      {/* Modal or form for uploading media */}
      {mediaType && (
        <div className="media-modal">
          <h3>
            <FontAwesomeIcon
              icon={mediaType === "file" ? faFile : faImage}
              className="media-type-icon"
            />
            Upload{" "}
            {mediaType === "file"
              ? "Files"
              : mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
          </h3>
          {/* Add your file input or media-specific form here */}
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <button onClick={closeMediaModal}>Close</button>
        </div>
      )}
      {/* Section to display uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>Uploaded Files</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

CreatePost.propTypes = {
  userProfilePicture: PropTypes.string.isRequired,
};

export default CreatePost;
