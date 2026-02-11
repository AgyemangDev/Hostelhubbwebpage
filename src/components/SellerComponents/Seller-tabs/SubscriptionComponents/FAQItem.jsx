import { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
