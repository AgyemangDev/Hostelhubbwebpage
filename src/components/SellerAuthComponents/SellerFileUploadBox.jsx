// SellerFileUploadBox.jsx
import React from "react";
import { Upload } from "lucide-react";

const SellerFileUploadBox = ({
  name,
  label,
  icon: Icon,
  required,
  description,
  fileNames,
  handleFileChange,
  errors,
  setErrors,
}) => (
  <div
    className={`border-2 border-dashed rounded-lg p-6 hover:border-[#610b0c] transition-colors ${
      errors[name] ? "border-red-500" : "border-gray-300"
    }`}
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-900 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <p className="text-xs text-gray-500 mb-3">{description}</p>

        <input
          type="file"
          name={name}
          onChange={(e) => {
            handleFileChange(e);
            setErrors((prev) => ({ ...prev, [name]: null }));
          }}
          accept="image/*,.pdf"
          className="hidden"
          id={name}
        />
        <label
          htmlFor={name}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          {fileNames[name] ? "Change File" : "Choose File"}
        </label>

        {fileNames[name] && (
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {fileNames[name].name || fileNames[name]}
          </p>
        )}

        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
        )}
      </div>
    </div>
  </div>
);

export default SellerFileUploadBox;
