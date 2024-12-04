// PrivacyPolicyPage.js
import TermsNavbar from "./TermsNavBar";

function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-gray-900">
      <TermsNavbar />
      <main className="container mx-auto p-6 sm:px-12 md:px-24">
        <h1 className="text-4xl font-bold text-center text-secondary mb-12">
          Privacy Policy
        </h1>

        <section className="space-y-12">
          <div className="prose lg:prose-xl mx-auto text-sm">
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                Introduction
              </h2>
              <p>
                This Privacy Policy outlines how HostelHubb Ghana collects,
                uses, and protects your information. By using our services, you
                consent to the terms outlined in this policy.
              </p>
            </div>

            {/* Information Collection */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                1. Information Collection
              </h2>
              <p>
                We collect information to provide a better experience,
                including:
              </p>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  Personal information such as your name, email, and contact
                  details.
                </li>
                <li>Payment information for booking transactions.</li>
                <li>Usage data to improve our services and user experience.</li>
              </ul>
            </div>

            {/* Information Usage */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                2. Information Usage
              </h2>
              <p>Your information is used to:</p>
              <ul className="list-inside list-disc space-y-3">
                <li>Facilitate bookings and provide customer support.</li>
                <li>Improve our app's functionality and user experience.</li>
                <li>
                  Communicate important updates or changes in our services.
                </li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                3. Information Sharing
              </h2>
              <p>
                We do not share your personal information with third parties
                except:
              </p>
              <ul className="list-inside list-disc space-y-3">
                <li>As necessary to complete a transaction you request.</li>
                <li>To comply with legal requirements or enforce our terms.</li>
                <li>
                  With trusted third-party partners for business purposes.
                </li>
              </ul>
            </div>

            {/* Security Measures */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                4. Security Measures
              </h2>
              <p>
                We take reasonable precautions to protect your information but
                cannot guarantee absolute security. Your data is stored with
                encryption and access controls.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                5. Your Rights
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>Access, correct, or delete your personal data.</li>
                <li>Withdraw consent for data processing at any time.</li>
                <li>Request a copy of the data we hold on you.</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                6. Cookies
              </h2>
              <p>
                We use cookies to enhance your experience. By continuing to use
                our site, you consent to our use of cookies as described in this
                policy.
              </p>
            </div>

            {/* Policy Updates */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                7. Policy Updates
              </h2>
              <p>
                We may update this policy as needed. Your continued use of our
                services constitutes acceptance of these changes.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                8. Contact Us
              </h2>
              <p>
                For questions regarding this Privacy Policy, please contact us
                at hostelhubofficial@gmail.com.
              </p>
            </div>

            <p className="italic text-center mt-12 text-lg">
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
