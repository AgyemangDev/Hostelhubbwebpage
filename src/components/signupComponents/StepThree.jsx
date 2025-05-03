import React, { useState } from 'react';

const StepThree = ({
  formData,
  handleInputChange,
  handleFileChange,
  passportPhotoName,
  idCardPhotoName,
}) => {
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState("");

  const handleTextareaChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    const count = e.target.value.trim() === "" ? 0 : words.length;
    if (count <= 100) {
      setWordCount(count);
      setError("");
      handleInputChange(e);
    } else {
      setWordCount(count);
      setError("Please limit your response to 100 words.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 3: Upload Documents</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Passport Photo <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="passportPhoto"
          onChange={handleFileChange}
          className="w-full border px-4 py-2 rounded"
          onClick={(e) => e.stopPropagation()}
          accept="image/*"
          required
        />
        {passportPhotoName ? (
          <p className="text-sm text-green-500 mt-2">✓ {passportPhotoName}</p>
        ) : (
          <p className="text-sm text-gray-500 mt-2">Please upload your passport photo</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          ID Card Photo <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="idCardPhoto"
          onChange={handleFileChange}
          className="w-full border px-4 py-2 rounded"
          onClick={(e) => e.stopPropagation()}
          accept="image"
          required
        />
        {idCardPhotoName ? (
          <p className="text-sm text-green-500 mt-2">✓ {idCardPhotoName}</p>
        ) : (
          <p className="text-sm text-gray-500 mt-2">Please upload your ID card photo</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Why do you want to join? (100 words max) <span className="text-red-500">*</span>
        </label>
        <textarea
          name="reason"
          value={formData.reason || ""}
          onChange={handleTextareaChange}
          rows={4}
          className="w-full border px-4 py-2 rounded"
          placeholder="Explain briefly in 100 words or less"
          required
        />
        <p className="text-sm text-gray-600 mt-1">Word count: {wordCount}/100</p>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <p className="text-xs text-gray-500 mt-4">* All fields are required to proceed</p>
    </div>
  );
};

export default StepThree;
