import TermsNavbar from "./TermsNavBar";

function TransactionPolicy() {
  return (
    <div className="bg-white text-gray-900">
      <TermsNavbar />
      <main className="container mx-auto p-6 sm:px-12 md:px-24">
        <h1 className="text-4xl font-bold text-center text-secondary mb-12">
          Transaction Policy
        </h1>

        <section className="space-y-12">
          <div className="prose lg:prose-xl mx-auto text-sm">
            {/* Overview Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                Overview
              </h2>
              <p>
                This Transaction Policy outlines the terms and conditions that
                apply to any transactions completed through HostelHubb.
              </p>
            </div>

            {/* Transaction Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                1. Transaction Terms
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  All payments for bookings must be completed through approved
                  methods within the HostelHubb app.
                </li>
                <li>
                  HostelHubb does not assume liability for any disputes between
                  users and hostels regarding transactions.
                </li>
              </ul>
            </div>

            {/* Refund Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                2. Refund Policy
              </h2>
              <p>
                Refunds are managed directly by the hostels and are subject to
                the individual refund policy of each hostel. HostelHubb does not
                process refunds.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                3. Payment Methods
              </h2>
              <ul className="list-inside list-disc space-y-3">
                <li>
                  Payments can be made via mobile money, bank transfer, or
                  credit card, depending on available options.
                </li>
                <li>
                  It is the user’s responsibility to ensure that payment details
                  are accurate.
                </li>
              </ul>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                4. Dispute Resolution
              </h2>
              <p>
                Any disputes related to transactions are to be resolved directly
                with the hostel. HostelHubb acts solely as a booking platform
                and is not involved in disputes.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TransactionPolicy;
