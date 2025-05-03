import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = [1, 2, 3,4];

  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step) => (
        <div
          key={step}
          className={`w-1/3 h-2 rounded-full ${
            step <= currentStep ? 'bg-[#610b0c]' : 'bg-gray-300'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;