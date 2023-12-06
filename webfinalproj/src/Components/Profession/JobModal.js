// // JobModal.js
// import React from 'react';
// import './JobModal.css'; // Ensure you have the corresponding CSS file

// const JobModal = ({ job, onNext, onApply, onAlreadyApplied, onClose }) => {
//     return (
//         <div className="job-modal-backdrop">
//           <div className="job-modal-content">
//             <h2>{job.title}</h2>
//             <p>{job.description}</p>
//             {/* You can add an image here if your job objects include image URLs */}
//             {job.image && <img src={job.image} alt={job.title} />}
//             <div className="job-modal-actions">
//               <button onClick={onNext}>Next</button>
//               <button onClick={onApply}>Apply for Job</button>
//               <button onClick={onAlreadyApplied}>Already Applied</button>
//               <button onClick={onClose}>Close</button>
//             </div>
//           </div>
//         </div>
//       );
//     };
//     export default JobModal;


// JobModal.js

import React, { useState } from 'react';
import './JobModal.css'; 

const JobModal = ({ job, onNext, onApply, onClose, isApplication }) => {
  const [hasApplied, setHasApplied] = useState(false);

  const handleApplyClick = async () => {
    await onApply(); // Assuming onApply is an async function
    setHasApplied(true); // Set the flag to true after applying
  };

  return (
    <div className="job-modal-backdrop">
      <div className="job-modal-content">
        <h2>{job.title}</h2>
        <p>{job.description}</p>
        {job.image && <img src={job.image} alt={job.title} />}
        <div className="job-modal-actions">
          <button onClick={onNext}>Next</button>
          {!isApplication && (
            <button 
              onClick={handleApplyClick} 
              style={{ backgroundColor: hasApplied ? 'green' : '' }}
              disabled={hasApplied}
            >
              {hasApplied ? 'Applied' : 'Apply for Job'}
            </button>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;

