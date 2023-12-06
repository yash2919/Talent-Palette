
import React, { useState,useEffect } from 'react';

import JobListings from './JobListings';
import JobDetails from './JobDetails';
import CategoryButtons from './CategoryButtons'; 
import jobData from './JobData';
import './Profession.css'

const ProfessionPage=()=> {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [alljobs, setallJobs] = useState([{}]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedData = await jobData(); // Call the jobData function to fetch data
       console.log(fetchedData);
        setallJobs(fetchedData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []); 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedJob(null); 
  };

  return (
    <div>
      <CategoryButtons onSelectCategory={handleCategorySelect} />
      {!selectedJob && selectedCategory ? (
        <JobListings 

          jobs={alljobs[selectedCategory]} 

          onSelectJob={setSelectedJob} 
        />
      ) : selectedJob ? (
        <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
      ) : null}
    </div>
  );
}

export default ProfessionPage;
