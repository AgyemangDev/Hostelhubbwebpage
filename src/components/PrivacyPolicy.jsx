// PrivacyPolicyPage.js
import TermsNavbar from "./TermsNavBar";

function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <TermsNavbar />
      <main className="container mx-auto p-6 sm:px-8 lg:px-20 xl:px-32">
        <h1 className="text-4xl font-semibold text-center text-secondary mb-8">
          Privacy Policy
        </h1>

        <section className="space-y-12">
          <div className="prose lg:prose-lg mx-auto text-base leading-relaxed text-gray-700">
            {/* Introduction */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                Introduction
              </h2>
              <p>
              At HostelHubb, we prioritize your privacy and take it seriously. 
              We understand that by using our services, you're placing your 
              trust in us, and we are committed to honoring that trust by safeguarding 
              your personal data. We aim to act in the best interest of our users and 
              maintain transparency in how we handle and protect your information.
              </p>
              <p className="mt-3">
              This document, referred to as our Privacy Statement, explains how we use and process your
               personal data in a clear and transparent manner. Here, you'll also learn about your rights 
               regarding your personal data and how you can reach out to us for any concerns. 
              When you use HostelHubb, through our mobile app, this Privacy Statement applies to any personal 
              data collected through these channels.If you’re one of our business partners, please refer to our Privacy Statement
             for Business Partners for more specific information on data handling in our business relationships.
              We may update this Privacy Statement from time to time. If any significant changes that impact you are made,
              we’ll inform you before implementing them, so you always know where you stand regarding your privacy with HostelHubb.
              We encourage you to check back here periodically to stay informed of any updates.
              </p>
            </div>

            {/* Information Collection */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                1. Information Collection
              </h2>
              <p>
                We collect information to provide a better experience,
                including:
              </p>
              <ul className="list-inside list-disc space-y-3 ml-4 text-gray-600">
                <li>
                  Personal information such as your name, email, and contact
                  details.
                </li>
                <li>Payment information for booking transactions.</li>
                <li>Usage data to improve our services and user experience.</li>
              </ul>
            </div>

            {/* Information Usage */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                2. Information Usage
              </h2>
              <p>Your information is used to:</p>
              <ul className="list-inside list-disc space-y-3 ml-4 text-gray-600">
                <li>Facilitate bookings and provide customer support.</li>
                <li>Improve our app's functionality and user experience.</li>
                <li>
                  Communicate important updates or changes in our services.
                </li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                3. Information Sharing
              </h2>
              <p>
                We do not share your personal information with third parties
                except:
              </p>
              <ul className="list-inside list-disc space-y-3 ml-4 text-gray-600">
                <li>As necessary to complete a transaction you request.</li>
                <li>To comply with legal requirements or enforce our terms.</li>
                <li>
                  With trusted third-party partners for business purposes.
                </li>
              </ul>
            </div>

            {/* Security Measures */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                4. Security Measures
              </h2>
              <p>
                We take reasonable precautions to protect your information but
                cannot guarantee absolute security. Your data is stored with
                encryption and access controls.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                5. Your Rights
              </h2>
              <ul className="list-inside list-disc space-y-3 ml-4 text-gray-600">
                <li>Access, correct, or delete your personal data.</li>
                <li>Withdraw consent for data processing at any time.</li>
                <li>Request a copy of the data we hold on you.</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                6. Cookies
              </h2>
              <p>
                We use cookies to enhance your experience. By continuing to use
                our site, you consent to our use of cookies as described in this
                policy.
              </p>
            </div>

            {/* Policy Updates */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                7. Policy Updates
              </h2>
              <p>
                We may update this policy as needed. Your continued use of our
                services constitutes acceptance of these changes.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                8. Contact Us
              </h2>
              <p>
                For questions regarding this Privacy Policy, please contact us
                at hostelhubofficial@gmail.com.
              </p>
            </div>

            <p className="italic text-center mt-12 text-gray-500 text-lg">
              By using our services, you confirm that you have read, understood,
              and agree to this Privacy Policy.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PrivacyPolicyPage;