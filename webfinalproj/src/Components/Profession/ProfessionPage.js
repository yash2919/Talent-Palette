import React, { useState } from 'react';
import JobListings from './JobListings';
import JobDetails from './JobDetails';
import CategoryButtons from './CategoryButtons'; 
import jobData from './JobData';
import './Profession.css'
function ProfessionPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedJob(null); 
  };

  return (
    <div>
      <CategoryButtons onSelectCategory={handleCategorySelect} />
      {!selectedJob && selectedCategory ? (
        <JobListings 
          jobs={jobData[selectedCategory]} 
          onSelectJob={setSelectedJob} 
        />
      ) : selectedJob ? (
        <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
      ) : null}
    </div>
  );
}

export default ProfessionPage;
