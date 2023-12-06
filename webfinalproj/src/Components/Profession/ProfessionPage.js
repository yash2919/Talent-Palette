
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

const ProfessionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [allJobs, setAllJobs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedData = await jobData();
        setAllJobs(fetchedData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

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
  const handleApplyJob = () => {
    console.log('Apply for job:', selectedJob);
    // Add functionality to apply for a job
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
