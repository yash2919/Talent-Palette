import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Header/Navbar';
import Card from '../Common/PostCard/FeedCard';
import image3 from '../../assets/images/artist.jpg';
import CreatePost from '../../Components/Post';
import './PortfolioPage.css';
import UploadWidget from "../Common/UploadWidget/UploadWidget"

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("dfda");
  const [skills, setSkills] = useState("dfad");
  const [profileImage, setProfileImage] = useState("");
  const [gigsInfo, setGigsInfo] = useState("adfad");
  const [allPosts,setallPosts]=useState([]);


  const [postimgUrl, setpostimgUrl] = useState("dfdf");

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

    async function fetchUserEmail() {
      try {
          const response = await fetch('http://localhost:3000', {
            method: 'GET',
            credentials: 'include', // Send cookies with the request
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log(data.email); // Handle email data as needed

          if(data.valid===true){
            // setEmail(data.email);
            console.log(data.email);

            setEmail(data.email);

            console.log(email);
            // fetchProfile();
          }
          else{
            navigate("/home");
          }
          

          } else {
            throw new Error('Failed to fetch email');
          }
        } catch (error) {
          console.error('Error fetching email:', error);
          // Handle errors
        }
  }

  // Flag to check if the component is still mounted
  async function fetchProfile() {
    try {
      console.log(email);
      const response = await fetch(`http://localhost:3000/user/profile/${email}`, {
        method: "GET",
        credentials: "include", 
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // if(data!=null)
        setArtistProfile(data);          
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // Handle errors
    }
  }

  async function fetchallPosts() {
    try {
      const response = await fetch("http://localhost:3000/post/getallposts", {
        method: "GET",
        credentials: "include", 
      });

      if (response.ok) {
        const data = await response.json();
        // if(data!=null)
        setallPosts(data.post.map(post => ({
          // email: post.email,
          userName: post.userName? post.userName : post.email,
          userImg: post.userImg? post.userImg:image3,
          postName: post.postName,
          postimgUrl: post.postimgUrl,
          postType: post.postType? post.postType : "img",
          timestamp:post.timestamp ? post.timestamp: "2023-12-05T12:34:56",
          _id: post._id
        })));
        
        console.log(data.post[0].timestamp);
        
      } else {
        throw new Error("Failed to fetch email");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
      // Handle errors
    }
  }
  

    fetchUserEmail();

    // Cleanup function to set the isMounted flag to false when the component is unmounted
    // return () => {
    //   isMounted = false;
    // };
      if (email) {
        fetchProfile();
      }

      fetchallPosts();

  }, [email]);

  const handleEdit = () => {
    setEditMode(true);
  };

  // const handleSave = async () => {
  //   try {
  //     await axios.put('/user/profile', artistProfile);
  //     alert('Profile updated successfully!');
  //     setEditMode(false);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setArtistProfile({ ...artistProfile, [name]: value });
  // };

// ...

const handleChange = (e) => {
  const { name, value } = e.target;

  // Update the corresponding state based on the name attribute
  switch (name) {
    case 'fullName':
      setFullName(value);
      break;
    case 'skills':
      setSkills(value);
      break;
    case 'profileImage':
      setProfileImage(value);
      break;
    case 'gigsInfo':
      setGigsInfo(value);
      break;
    // Add other cases as needed
    default:
      break;
  }
}

const handleSave = async (result)  => {
  try {
    const response = await fetch("http://localhost:3000/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullName, skills, profileImage, gigsInfo }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      //  navigate('/home');
    } else {
      alert(`Post Upload failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Error during Post Upload:", error);
    alert("An error occurred during Post Upload.");
  }
};

// ...


  const handleOntTest = (result) => {
    if(result!=null){
     // console.log("url"+result);
      setProfileImage(result);
    }
  };

  return (
    <div>
      <Navbar />
      {artistProfile && (
        <div className="profile-container">
          
          {editMode ? (
            <div>
            <h3 className="want-to-post">Want to Post Something?</h3>
            <UploadWidget onTest={handleOntTest}></UploadWidget>
          </div>
          ) : (
            <img
              src={profileImage || image3}
              alt={`${artistProfile.profileImage}'s Profile`}
              className="profile-image"
            />
          )}
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
          <div className="about-section">
            {editMode ? (
              <input
                name="about"
                type="text"
                value={artistProfile.about}
                onChange={handleChange}
              />
            ) : (
              <p>{artistProfile.about}</p>
            )}
          </div>
          <div className="skills-section">
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
            {/* ... (other components) */}
          </div>
        </div>
      )}
      {
        <div>
          {allPosts && allPosts[1] ? (
          allPosts.map((post, index) => (
            <Card
              key={index}
              userName={post.userName}
              userImg={post.userImg}
              postContent={post.postName}
              postUrl={post.postimgUrl}
              mediaType={"image"}
              timestamp={post.timestamp}
            />
          ))
        ) : (
          <p>Loading...</p>
          )}
        </div>
      }
    </div>
  );
}  
export default PortfolioPage;
