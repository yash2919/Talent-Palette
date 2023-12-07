// import React, { useState } from 'react';
// import './JobModal.css';

// const JobModal = ({ job, onNext, onApply, onClose, isApplication }) => {
//   const [hasApplied, setHasApplied] = useState(false);

//   const handleApplyClick = async () => {
//     await onApply(); // Assuming onApply is an async function
//     setHasApplied(true); // Set the flag to true after applying
//   };
//   const statusClass = job.status === 'accepted' ? 'job-accepted-modal' : 'job-not-accepted-modal';

//   return (
//     <div className="job-modal-backdrop">
//       <div className="job-modal-content">
//         <h2>{job.title}</h2>
//         <p>{job.description}</p>
//         {job.image && <img src={job.image} alt={job.title} />}
//         <div className="job-modal-actions">
//           <button onClick={onNext}>Next</button>
//           {isApplication && (
//             /* Display the status only for "My Applications" */
//             <div className="job-status">
//               Status: {job.status === 'accepted' ? 'Accepted' : 'Not Accepted'}
//             </div>
//           )}
//           {!isApplication && (
//             <button
//               onClick={handleApplyClick}
//               style={{ backgroundColor: hasApplied ? 'green' : '' }}
//               disabled={hasApplied}
//             >
//               {hasApplied ? 'Applied' : 'Apply for Job'}
//             </button>
//           )}
//           <button onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobModal;


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
      <div className={`job-modal-content ${isApplication ? (job.status === 'accepted' ? 'job-accepted-modal' : 'job-not-accepted-modal') : ''}`}>
        <h2>{job.title}</h2>
        <p>{job.description}</p>
        {job.image && <img src={job.image} alt={job.title} />}
        <div className="job-modal-actions">
          <button onClick={onNext}>Next</button>
          {isApplication && (
            /* Display the status only for "My Applications" */
            <div className="job-status">
              Status: {job.status === 'accepted' ? 'Accepted' : 'Not Accepted'}
            </div>
          )}
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

