"use client";

import { useEffect } from "react";
import TermsNavbar from "../components/TermsNavBar";
import PrivacyPolicyContent from "../content/PrivacyPolicyContent";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-gray-800">
      <TermsNavbar />
      <main className="container mx-auto p-8 sm:px-14 md:px-28">
        <h1 className="text-4xl font-semibold text-center text-secondary mb-8">
          Privacy Policy
        </h1>
        <PrivacyPolicyContent />
      </main>
    </div>
  );
}
