import React from 'react';

const StepThree = ({ formData, handleFileChange, passportPhotoName, idCardPhotoName }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 3: Upload Documents</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Passport Photo</label>
        <input
          type="file"
          name="passportPhoto"
          onChange={handleFileChange}
          className="w-full border px-4 py-2 rounded"
        />
        {passportPhotoName && <p className="text-sm text-gray-500 mt-2">{passportPhotoName}</p>}
      </div>
      <div>
        <label className="block text-gray-700 mb-2">ID Card Photo</label>
        <input
          type="file"
          name="idCardPhoto"
          onChange={handleFileChange}
          className="w-full border px-4 py-2 rounded"
        />
        {idCardPhotoName && <p className="text-sm text-gray-500 mt-2">{idCardPhotoName}</p>}
      </div>
    </div>
  );
};

export default StepThree;