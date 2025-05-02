import React from 'react';

const StepTwo = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 2: Program Details</h2>
      <input
        type="text"
        name="program"
        value={formData.program}
        onChange={handleInputChange}
        placeholder="Program Name"
        className="w-full border px-4 py-2 rounded mb-4"
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleInputChange}
        className="w-full border px-4 py-2 rounded mb-4"
      />
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleInputChange}
        className="w-full border px-4 py-2 rounded"
      />
    </div>
  );
};

export default StepTwo;