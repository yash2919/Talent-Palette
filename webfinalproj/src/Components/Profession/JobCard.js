// JobCard.js
import React from 'react';


const JobCard = ({ job, onClick, isActive }) => {
  const cardClassName = `job-card ${isActive ? 'active' : ''}`;
  return (
    <div className={cardClassName} onClick={onClick}>
    <img src={job.image} alt={job.title} />
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      {/* Add more job details you'd like to show on the card */}
    </div>
  );
};

export default JobCard;