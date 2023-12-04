import React, { useEffect,useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faVideo,
  faFile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./Post.css"; 
import UploadWidget from "./Common/UploadWidget/UploadWidget"

const CreatePost = ({ userProfilePicture ,onPostCreated}) => {
  const [mediaType, setMediaType] = useState(null);
  const [postimgUrl, setpostimgUrl] = useState("");
  const [postName, setpostName] = useState("");
  const [email, setemail] = useState(null);

  const openMediaModal = (type) => {
    setMediaType(type);
  };

  const closeMediaModal = () => {
    setMediaType(null);
  };

  const handleFileUpload = (files) => {

    setpostimgUrl((prevFiles) => [...prevFiles, ...files]);
    closeMediaModal();
  };

  const handlePost = async () => {
   
    // console.log("Post Data:", {
    //   userEmail,
    //   postContent,
    //   postimgUrl
    // });

    console.log(postName);

    try {
      const response = await fetch("http://localhost:3000/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, postName, postimgUrl })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);

        onPostCreated();

        //  navigate('/home');
      } else {
        alert(`Post Upload failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during Post Upload:", error);
      alert("An error occurred during Post Upload.");
    }



    // setPostContent("");
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
     
          } else setemail(data.email);
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

  const handleOntTest = (result) => {
    if(result!=null){
     // console.log("url"+result);
      setpostimgUrl(result);
    }
  }

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
        <UploadWidget onTest={handleOntTest}></UploadWidget>
      </div>
      <div className="post-box-container">
        <textarea
          className="post-box"
          placeholder="Start a post..."
          value={postName}
          onChange={(e) => setpostName(e.target.value)}
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
      {/* {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>Uploaded Files</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

CreatePost.propTypes = {
  userProfilePicture: PropTypes.string.isRequired,
};

export default CreatePost;
