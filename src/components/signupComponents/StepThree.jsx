import React from 'react';

const departments = [
  // "Hostel Agent",
  "Storage Pickup Assistant",
  // "Advertisement Team",
  // "Video/Graphic Editor",
  "Marketing & Advertising Personnel"
];

const StepThree = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 3: Department Interest</h2>

      <label className="block mb-2 font-medium">Choose a Department</label>
      <div className="space-y-2 mb-4">
        {departments.map((dept) => (
          <label key={dept} className="flex items-center space-x-2">
            <input
              type="radio"
              name="department"
              value={dept}
              checked={formData.department === dept}
              onChange={handleInputChange}
            />
            <span>{dept}</span>
          </label>
        ))}
      </div>

      <label className="block mb-2 font-medium">
        What do you hope to gain or contribute?
      </label>
      <textarea
        name="expectations"
        value={formData.expectations}
        onChange={handleInputChange}
        placeholder="Share your goals or expectations, elaborate..."
        className="w-full border px-4 py-2 rounded"
        rows={4}
      />
    </div>
  );
};

export default StepThree;
