import React from "react";
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
import SellerFileUploadBox from "./SellerFileUploadBox";

const SellerStepTwo = ({ formData, handleFileChange, handleInputChange, fileNames, errors, setErrors }) => {
  return (
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
          Please fill in your business information and upload verification documents.
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
            value={formData.fullName || ""}
            onChange={handleInputChange}
            name="fullName"
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
            value={formData.email || ""}
            onChange={handleInputChange}
            name="email"
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
            value={formData.phoneNumber || ""}
            onChange={handleInputChange}
            name="phoneNumber"
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
            value={formData.businessName || ""}
            onChange={handleInputChange}
            name="businessName"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
          />
        </div>

        {/* Business Type Dropdown */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <Briefcase className="w-4 h-4 text-gray-500" /> Business Type
          </label>
          <select
            value={formData.businessType || ""}
            onChange={handleInputChange}
            name="businessType"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
          >
            <option value="">Select type</option>
            <option value="Personal">Personal</option>
            <option value="registered">Business</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-gray-500" /> Business Address
          </label>
          <input
            type="text"
            placeholder="Enter business address"
            value={formData.businessAddress || ""}
            onChange={handleInputChange}
            name="businessAddress"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
          />
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Verification Documents</h2>
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
              <li>Business registration required only for registered businesses</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <SellerFileUploadBox
            name="ghanaCardFront"
            label="Ghana Card (Front Side)"
            icon={CreditCard}
            required
            description="Upload the front of your Ghana Card with photo visible"
            handleFileChange={handleFileChange}
            fileNames={fileNames}
            errors={errors}
            setErrors={setErrors}
          />

          <SellerFileUploadBox
            name="ghanaCardBack"
            label="Ghana Card (Back Side)"
            icon={CreditCard}
            required
            description="Upload the back of your Ghana Card"
            handleFileChange={handleFileChange}
            fileNames={fileNames}
            errors={errors}
            setErrors={setErrors}
          />

          <SellerFileUploadBox
            name="proofOfOwnership"
            label="Proof of Property Ownership"
            icon={Home}
            required
            description="Land title, lease agreement, or property deed"
            handleFileChange={handleFileChange}
            fileNames={fileNames}
            errors={errors}
            setErrors={setErrors}
          />

          {formData.businessType === "registered" && (
            <SellerFileUploadBox
              name="businessRegistration"
              label="Business Registration Certificate"
              icon={FileText}
              required
              description="Official business registration from Registrar General"
              handleFileChange={handleFileChange}
              fileNames={fileNames}
              errors={errors}
              setErrors={setErrors}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SellerStepTwo;
