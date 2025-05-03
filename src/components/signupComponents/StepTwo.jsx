import React from 'react';

const StepTwo = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 2: Program Details</h2>

      <label className="block mb-2 font-medium">Program Name</label>
      <input
        type="text"
        name="program"
        value={formData.program}
        onChange={handleInputChange}
        placeholder="e.g. BSc. Computer Science"
        className="w-full border px-4 py-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Year You Started School</label>
      <input
        type="number"
        name="startYear"
        value={formData.startYear}
        onChange={handleInputChange}
        placeholder="e.g. 2022"
        min="2000"
        max={new Date().getFullYear()}
        className="w-full border px-4 py-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Expected Year of Completion</label>
      <input
        type="number"
        name="endYear"
        value={formData.endYear}
        onChange={handleInputChange}
        placeholder="e.g. 2026"
        min="2000"
        max="2100"
        className="w-full border px-4 py-2 rounded"
      />
    </div>
  );
};

export default StepTwo;
