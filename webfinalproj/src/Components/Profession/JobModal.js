// JobModal.js
import React from 'react';
import './JobModal.css'; // Ensure you have the corresponding CSS file

const JobModal = ({ job, onNext, onApply, onAlreadyApplied, onClose }) => {
    return (
        <div className="job-modal-backdrop">
          <div className="job-modal-content">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            {/* You can add an image here if your job objects include image URLs */}
            {job.image && <img src={job.image} alt={job.title} />}
            <div className="job-modal-actions">
              <button onClick={onNext}>Next</button>
              <button onClick={onApply}>Apply for Job</button>
              <button onClick={onAlreadyApplied}>Already Applied</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      );
    };
    export default JobModal;