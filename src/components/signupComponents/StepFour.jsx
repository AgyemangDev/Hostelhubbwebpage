import React from 'react';

const StepFour = ({ formData, handleFileChange, schoolIdPhotoName, nationalIdPhotoName }) => {
  // File size validation helper
  const validateFileSize = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB max size
    if (file && file.size > maxSize) {
      return false;
    }
    return true;
  };

  // Custom file change handler with validation
  const onFileChange = (e) => {
    const { name, files } = e.target;
    
    if (files && files[0]) {
      // Check file size
      if (!validateFileSize(files[0])) {
        alert("File size exceeds 5MB limit. Please select a smaller file.");
        e.target.value = ""; // Reset the input
        return;
      }
      
      // If valid, call the original handler
      handleFileChange(e);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 4: Upload Verification Documents</h2>
      <p className="text-sm text-gray-600 mb-4">
        Please upload clear images of your IDs. Maximum file size: 5MB per image.
      </p>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Upload a Clear Photo of Your <strong>School ID</strong></label>
        <input
          type="file"
          name="schoolIdPhoto"
          accept="image/jpeg,image/png,image/jpg"
          onChange={onFileChange}
          className="w-full border px-4 py-2 rounded"
        />
        {schoolIdPhotoName && (
          <p className="text-sm text-gray-500 mt-2">Selected: {schoolIdPhotoName}</p>
        )}
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2">Upload a Photo of Your <strong>National ID (e.g. Ghana Card)</strong></label>
        <input
          type="file"
          name="nationalIdPhoto"
          accept="image/jpeg,image/png,image/jpg"
          onChange={onFileChange}
          className="w-full border px-4 py-2 rounded"
        />
        {nationalIdPhotoName && (
          <p className="text-sm text-gray-500 mt-2">Selected: {nationalIdPhotoName}</p>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
        <p><strong>Note:</strong> Make sure your uploaded images are:</p>
        <ul className="list-disc ml-5 mt-1">
          <li>Clear and readable</li>
          <li>Show all required information</li>
          <li>Less than 5MB in size</li>
        </ul>
      </div>
    </div>
  );
};

export default StepFour;