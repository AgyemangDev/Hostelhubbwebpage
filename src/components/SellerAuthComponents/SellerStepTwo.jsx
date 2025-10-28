import React from "react";
import { motion } from "framer-motion";
import { Upload, CreditCard, FileText, Home, AlertCircle } from "lucide-react";

const SellerStepTwo = ({ formData, handleFileChange, fileNames }) => {
  const FileUploadBox = ({
    name,
    label,
    icon: Icon,
    required,
    description,
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#610b0c] transition-colors">
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
            onChange={handleFileChange}
            accept="image/*,.pdf"
            className="hidden"
            id={name}
            required={required}
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
              {fileNames[name]}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Verification Documents
        </h2>
        <p className="text-gray-600">Upload your documents for verification</p>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Document Requirements:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>All documents must be clear and readable</li>
            <li>Accepted formats: JPG, PNG, PDF (Max 5MB each)</li>
            <li>Ghana Card must show your face and details clearly</li>
            <li>
              Business registration required only for registered businesses
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        {/* Ghana Card - Front */}
        <FileUploadBox
          name="ghanaCardFront"
          label="Ghana Card (Front Side)"
          icon={CreditCard}
          required={true}
          description="Upload the front of your Ghana Card with photo visible"
        />

        {/* Ghana Card - Back */}
        <FileUploadBox
          name="ghanaCardBack"
          label="Ghana Card (Back Side)"
          icon={CreditCard}
          required={true}
          description="Upload the back of your Ghana Card"
        />

        {/* Proof of Ownership */}
        <FileUploadBox
          name="proofOfOwnership"
          label="Proof of Property Ownership"
          icon={Home}
          required={true}
          description="Land title, lease agreement, or property deed"
        />

        {/* Business Registration - Conditional */}
        {formData.businessType === "registered" && (
          <FileUploadBox
            name="businessRegistration"
            label="Business Registration Certificate"
            icon={FileText}
            required={true}
            description="Official business registration from Registrar General"
          />
        )}
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium text-gray-900 mb-2">Privacy & Security</p>
        <p className="text-xs leading-relaxed">
          Your documents are securely encrypted and stored. We use them only for
          verification purposes and never share them with third parties. All
          information is handled in accordance with our privacy policy and data
          protection regulations.
        </p>
      </div>
    </motion.div>
  );
};

export default SellerStepTwo;
