// JobListings.js
import React from 'react';
import JobCard from './JobCard';

const JobListings = ({ jobs, onSelectJob }) => {
  // If jobs is not an array, don't attempt to render JobCards
  if (!jobs) {
    return <div>No jobs available for this category.</div>;
  }

    return (
      <div className="job-listings">
        {jobs.map((job, index) => (
          <JobCard key={job.id} job={job} onClick={() => onSelectJob(job, index)} />
        ))}
      </div>
    );
  };

export default JobListings;