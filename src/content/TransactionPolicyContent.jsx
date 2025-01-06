export default function TransactionPolicyContent() {
  return (
    <section className="space-y-14">
      <div className="prose lg:prose-2xl mx-auto text-base text-gray-700">
        <div className="mb-14">
          <h2 className="text-3xl font-semibold text-secondary mb-4">
            Overview
          </h2>
          <p>
            This Transaction Policy outlines the terms and conditions that apply
            to any transactions completed through HostelHubb.
          </p>
        </div>

        <div className="mb-14">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            1. Transaction Terms
          </h2>
          <ul className="list-inside list-disc space-y-3 text-gray-600">
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

        <div className="mb-14">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            2. Refund Policy
          </h2>
          <p>
            Refunds are managed directly by the hostels and are subject to the
            individual refund policy of each hostel. HostelHubb does not process
            refunds.
          </p>
        </div>

        <div className="mb-14">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            3. Payment Methods
          </h2>
          <ul className="list-inside list-disc space-y-3 text-gray-600">
            <li>
              Payments can be made via mobile money, bank transfer, or credit
              card, depending on available options.
            </li>
            <li>
              It is the user's responsibility to ensure that payment details are
              accurate.
            </li>
          </ul>
        </div>

        <div className="mb-14">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            4. Dispute Resolution
          </h2>
          <p>
            Any disputes related to transactions are to be resolved directly
            with the hostel. HostelHubb acts solely as a booking platform and is
            not involved in disputes.
          </p>
        </div>
      </div>
    </section>
  );
}
