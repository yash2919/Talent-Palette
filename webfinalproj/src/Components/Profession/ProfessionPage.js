
// import React, { useState,useEffect } from 'react';

// import JobListings from './JobListings';
// import JobDetails from './JobDetails';
// import CategoryButtons from './CategoryButtons'; 
// import jobData from './JobData';
// import './Profession.css'

// const ProfessionPage=()=> {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [alljobs, setallJobs] = useState([{}]);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const fetchedData = await jobData(); // Call the jobData function to fetch data
//        console.log(fetchedData);
//         setallJobs(fetchedData);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };

//     fetchJobs();
//   }, []); 

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setSelectedJob(null); 
//   };

//   return (
//     <div>
//       <CategoryButtons onSelectCategory={handleCategorySelect} />
//       {!selectedJob && selectedCategory ? (
//         <JobListings 

//           jobs={alljobs[selectedCategory]} 

//           onSelectJob={setSelectedJob} 
//         />
//       ) : selectedJob ? (
//         <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
//       ) : null}
//     </div>
//   );
// }

// export default ProfessionPage;


// ProfessionPage.js
import React, { useState, useEffect } from 'react';
import JobListings from './JobListings';
import CategoryButtons from './CategoryButtons';
import JobModal from './JobModal';
import jobData from './JobData';
import './Profession.css';
import Navbar from '../Header/Navbar';
import axios from 'axios';
const ProfessionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [allJobs, setAllJobs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [email, setEmail] = useState(''); // State to hold email
  const [jobId, setJobId] = useState(''); // State to hold jobId


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedData = await jobData();
        setAllJobs(fetchedData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    const getemail = async () => {
    try {
      const response = await fetch("http://localhost:3000", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.valid === true) {setEmail(data.email);console.log(email);}
      } else {
        throw new Error("Failed to fetch email");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
      // Handle errors
    }
  }
  getemail();
    fetchJobs();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedJob(null);
    setCurrentJobIndex(0);
    setShowModal(false);
  };

  const handleJobSelect = (job, index) => {
    setSelectedJob(job);
    setCurrentJobIndex(index);
    setShowModal(true);
  };

  const handleNextJob = () => {
    const jobsInCategory = allJobs[selectedCategory];
    if (jobsInCategory && jobsInCategory.length > 0) {
      let nextIndex = (currentJobIndex + 1) % jobsInCategory.length;
      setSelectedJob(jobsInCategory[nextIndex]);
      setCurrentJobIndex(nextIndex);
    }
  };
  const handleApplyJob = async () => {

    console.log('Apply for job:', selectedJob.id);
      const userId=email;
      const jobId=selectedJob.id;
    try {
      const response = await axios.post('http://localhost:3000/application/apply', { userId, jobId }); // Replace with your API endpoint
      alert('Application successful:', response.data);
      console.log('Application successful:', response.data);
      // Optionally, handle success (e.g., show a success message)
    } catch (error) {
      alert('Error applying:', error.response.data.message);
      console.error('Error applying:', error.response.data.message);
    //  setErrorMessage(error.response.data.message); // Display error message
    }
  };

  const handleAlreadyApplied = () => {
    console.log('Already applied to job:', selectedJob);
    // Add functionality for already applied logic
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className='ProfessionPage'>
        <CategoryButtons onSelectCategory={handleCategorySelect} />
        {selectedCategory && !showModal && (
          <JobListings 
            jobs={allJobs[selectedCategory] || []} 
            onSelectJob={handleJobSelect} 
          />
        )}
        {showModal && selectedJob && (
          <JobModal 
            job={selectedJob} 
            onNext={handleNextJob}
            onApply={handleApplyJob}
            onAlreadyApplied={handleAlreadyApplied}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default ProfessionPage;
