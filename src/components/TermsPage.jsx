// TermsPage.js
import TermsNavbar from "./TermsNavBar";

function TermsPage() {
  return (
    <div className="bg-white text-gray-900">
      <TermsNavbar />
      <main className="container mx-auto p-6 sm:px-12 md:px-24">
        <h1 className="text-4xl font-bold text-center text-secondary mb-12">
          Terms and Conditions
        </h1>

        <section className="space-y-12">
          <div className="prose lg:prose-xl mx-auto text-sm">
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                Introduction
              </h2>
              <p>
                Welcome to HostelHubb Ghana. By downloading, installing,
                accessing, or using the App, you must agree to be bound by these
                Terms and Conditions. Please read them carefully.
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                1. Definitions
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  <strong>App:</strong> The HostelHubb mobile application.
                </li>
                <li>
                  <strong>User:</strong> The individual using the App.
                </li>
                <li>
                  <strong>Hostel:</strong> The accommodation provider on the
                  platform.
                </li>
                <li>
                  <strong>Booking:</strong> The reservation made through the
                  App.
                </li>
              </ul>
            </div>

            {/* Eligibility */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                2. Eligibility
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>You must be at least 13 years old to use the App.</li>
                <li>
                  You must have the legal authority to enter into these Terms.
                </li>
                <li>
                  All information you provide must be accurate and complete.
                </li>
              </ul>
            </div>

            {/* User Account */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                3. User Account
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>You must create an account to use the App.</li>
                <li>
                  It is your responsibility to maintain the confidentiality of
                  your account credentials.
                </li>
                <li>
                  You agree to notify us immediately of any unauthorized use of
                  your account.
                </li>
              </ul>
            </div>

            {/* Bookings */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                4. Bookings
              </h2>
              <p>
                When you book accommodations, HostelHubb provides the platform
                for facilitating bookings, but is not responsible for the actual
                booking or transaction.
              </p>
              <ul className="list-inside list-disc space-y-3">
                <li>Users agree to pay for their hostel bookings in full.</li>
                <li>
                  Bookings are subject to availability and hostel confirmation.
                </li>
                <li>HostelHubb does not handle refunds or cancellations.</li>
                <li>
                  Refund and cancellation policies are set by the hostel
                  management.
                </li>
                <li>
                  Any issues regarding refunds should be handled directly with
                  the hostel.
                </li>
              </ul>
            </div>

            {/* Our Platform */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                5. Our Platform
              </h2>
              <p>
                We provide a platform to facilitate the booking process but are
                not responsible for the actual transactions between the user and
                the hostel.
              </p>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  We strive to ensure accurate and up-to-date information, but
                  cannot guarantee its accuracy.
                </li>
                <li>
                  We may display varying content, features, and designs to
                  different users.
                </li>
                <li>
                  We do not endorse or recommend any specific hostel or
                  accommodation.
                </li>
                <li>
                  The contractual relationship is solely between you and the
                  hostel management.
                </li>
                <li>
                  Platform availability is 24/7, but may occasionally be down
                  for maintenance.
                </li>
                <li>
                  You agree to comply with all applicable laws when using our
                  platform.
                </li>
              </ul>
            </div>

            {/* Refund and Cancellation Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                6. Refund and Cancellation Policy
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  HostelHubb is not responsible for issuing refunds or
                  processing cancellations.
                </li>
                <li>
                  Refund and cancellation requests must be made directly with
                  the hostel.
                </li>
                <li>Each hostel has its own refund and cancellation policy.</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                7. Payment Terms
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  Payments can be made through the App using available payment
                  methods.
                </li>
                <li>
                  Payments are only valid for bookings and cannot be refunded
                  through HostelHubb.
                </li>
                <li>
                  It is your responsibility to ensure the authenticity of the
                  hostel and payment method.
                </li>
                <li>
                  HostelHubb is not responsible for fraudulent payments or
                  transactions.
                </li>
              </ul>
            </div>

            {/* User Conduct */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                8. User Conduct
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  Users must treat the hostel and other users with respect and
                  fairness.
                </li>
                <li>
                  Any unlawful, harmful, or disruptive behavior may result in
                  account suspension.
                </li>
                <li>
                  Users must not infringe on any intellectual property rights
                  while using the platform.
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                9. Intellectual Property
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  The App and all its content are the property of HostelHubb.
                </li>
                <li>
                  You are not authorized to reproduce, distribute, or modify any
                  content without permission.
                </li>
              </ul>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                10. Termination
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  We may terminate or suspend your account if you violate these
                  Terms or engage in unlawful activities.
                </li>
              </ul>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                11. Governing Law
              </h2>
              <p>These Terms are governed by the laws of [State/Country].</p>
            </div>

            {/* Changes */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                12. Changes
              </h2>
              <p>
                We may update these Terms from time to time. Continued use of
                the App constitutes acceptance of these changes.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                13. Contact
              </h2>
              <p>
                For questions or concerns regarding these Terms, please contact
                us at hostelhubofficial@gmail.com.
              </p>
            </div>

            <p className="italic text-center mt-12 text-lg">
              By using the App, you acknowledge that you have read, understood,
              and agree to these Terms and Conditions.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TermsPage;
