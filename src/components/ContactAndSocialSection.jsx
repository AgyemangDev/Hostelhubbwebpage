"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function ContactUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    email: "",
    phone: "",
    price_range: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const bannerRef = useRef(null);

  // Validation logic
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid =
    formData.from_name.trim() !== "" &&
    isEmailValid(formData.email) &&
    formData.message.trim() !== "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_ncxubhl",
        "template_nx3hieg", // Your EmailJS template ID
        formData,
        "dskMrGvegne1xkNw5" // Your EmailJS public key
      )
      .then(
        () => {
          setSubmitStatus("Message sent successfully!");
          setIsSubmitting(false);
          setFormData({
            from_name: "",
            email: "",
            phone: "",
            price_range: "",
            message: "",
          });
        },
        () => {
          setSubmitStatus("Failed to send message.");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
      onViewportEnter={() => setIsVisible(true)}
      ref={bannerRef}
      className="w-full max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6"
    >
      <motion.div
        className="flex-1 bg-white bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg p-6 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-secondary md:text-left">
          Contact Us / Send Your Review
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <span className="font-semibold">Note:</span> If you are seeking
          accommodation, please fill in all the required fields.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="from_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              type="text"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone Number (Optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your phone number"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="price_range"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Price Range (Optional)
            </label>
            <input
              id="price_range"
              name="price_range"
              value={formData.price_range}
              onChange={handleInputChange}
              placeholder="Your price range"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              type="text"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-secondary text-white rounded-md shadow-lg hover:bg-opacity-80 transition duration-300 ${
              isSubmitting || !isFormValid
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {submitStatus && (
          <p
            className={`mt-4 text-center ${
              submitStatus.includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {submitStatus}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
