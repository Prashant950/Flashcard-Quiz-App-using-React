// src/components/ProgressTracker.js
import React from 'react';

const ProgressTracker = ({ score, total }) => {
  return (
    <div className="progress-tracker">
      <h2>Quiz Completed</h2>
      <p>Your Score: {score} / {total}</p>
    </div>
  );
};

export default ProgressTracker;
