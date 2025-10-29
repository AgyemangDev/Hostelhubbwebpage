import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  CreditCard,
  FileText,
  Home,
  AlertCircle,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Briefcase,
} from "lucide-react";

const SellerStepTwo = ({ formData, handleFileChange, fileNames, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [sellerInfo, setSellerInfo] = useState({
    fullName: formData?.fullName || "",
    email: formData?.email || "",
    phone: formData?.phone || "",
    businessName: "",
    businessAddress: "",
    businessType: "",
  });

  const handleChange = (key, value) => {
    setSellerInfo((prev) => ({ ...prev, [key]: value }));
  };

  const FileUploadBox = ({
    name,
    label,
    icon: Icon,
    required,
    description,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFiles = [
      "ghanaCardFront",
      "ghanaCardBack",
      "proofOfOwnership",
    ];
    if (sellerInfo.businessType === "Business")
      requiredFiles.push("businessRegistration");

    let hasError = false;
    const newErrors = {};

    requiredFiles.forEach((name) => {
      if (!fileNames[name]) {
        newErrors[name] = "This file is required.";
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    if (onSubmit) onSubmit({ ...sellerInfo, ...fileNames });
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Seller Information
          </h2>
          <p className="text-gray-600">
            Please fill in your business information and upload verification
            documents.
          </p>
        </div>

        {/* Seller Info Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-gray-500" /> Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={sellerInfo.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-gray-500" /> Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={sellerInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <Phone className="w-4 h-4 text-gray-500" /> Phone
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={sellerInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <Building className="w-4 h-4 text-gray-500" /> Business Name
            </label>
            <input
              type="text"
              placeholder="Enter business name"
              value={sellerInfo.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
            />
          </div>

          {/* Business Type Dropdown */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-gray-500" /> Business Type
            </label>
            <select
              value={sellerInfo.businessType}
              onChange={(e) => handleChange("businessType", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
            >
              <option value="">Select type</option>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-gray-500" /> Business Address
            </label>
            <input
              type="text"
              placeholder="Enter business address"
              value={sellerInfo.businessAddress}
              onChange={(e) => handleChange("businessAddress", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
            />
          </div>
        </div>

        {/* Document Upload Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Verification Documents
          </h2>
          <p className="text-gray-600 mb-4">
            Upload your required documents for verification
          </p>

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-6">
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
            <FileUploadBox
              name="ghanaCardFront"
              label="Ghana Card (Front Side)"
              icon={CreditCard}
              required
              description="Upload the front of your Ghana Card with photo visible"
            />

            <FileUploadBox
              name="ghanaCardBack"
              label="Ghana Card (Back Side)"
              icon={CreditCard}
              required
              description="Upload the back of your Ghana Card"
            />

            <FileUploadBox
              name="proofOfOwnership"
              label="Proof of Property Ownership"
              icon={Home}
              required
              description="Land title, lease agreement, or property deed"
            />

            {sellerInfo.businessType === "Business" && (
              <FileUploadBox
                name="businessRegistration"
                label="Business Registration Certificate"
                icon={FileText}
                required
                description="Official business registration from Registrar General"
              />
            )}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
          <p className="font-medium text-gray-900 mb-2">Privacy & Security</p>
          <p className="text-xs leading-relaxed">
            Your documents are securely encrypted and stored. We use them only
            for verification purposes and never share them with third parties.
          </p>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-[#610b0c] text-white rounded-lg hover:bg-[#800b0b] transition-colors"
        >
          Submit
        </button>
      </motion.div>
    </form>
  );
};

export default SellerStepTwo;
