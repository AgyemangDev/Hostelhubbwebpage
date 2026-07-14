import Navbar from "@/components/Navbar";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: [
      `Welcome to HostelHubb ("HostelHubb," "we," "us," or "our"), a Ghana-based digital platform that connects students with hostel accommodation providers, and offers storage and logistics services designed around student life.`,
      `HostelHubb operates as a marketplace and service platform through our mobile application and website (together, the "App" or "Platform"), enabling users to browse and book hostel accommodation, arrange storage of personal belongings, and request pickup and delivery services.`,
      `These Terms and Conditions ("Terms" or "Agreement") govern your access to and use of the Platform. By downloading, installing, accessing, or using the App, you agree to be bound by these Terms. If you do not agree, you must not use the Platform.`,
    ],
    subsections: [
      {
        title: "1.1 Who This Agreement Applies To",
        list: [
          `Students and individuals seeking hostel accommodation ("Students" or "Users");`,
          `Individuals using our Storage Services ("Storage Customers");`,
          `Hostel owners and managers who list accommodation on the Platform ("Hostel Providers");`,
          `Third-party logistics and delivery partners engaged to fulfil pickup and delivery requests ("Service Partners"); and`,
          `Any other person or entity that accesses or uses the Platform in any capacity.`,
        ],
      },
    ],
  },
  {
    title: "2. Definitions",
    table: [
      ["HostelHubb / Platform / App", "The HostelHubb mobile application, website, and all related services operated by NAG HOSTELHUBB."],
      ["User", "Any individual who accesses or uses the Platform, including Students, Customers, Hostel Providers, and Service Partners."],
      ["Student", "A User who uses the Platform to search for, browse, or book hostel accommodation."],
      ["Customer", "A User who books or uses any service on the Platform, including Storage or Logistics Services."],
      ["Hostel Provider", "The individual, business, or entity that owns or manages hostel accommodation listed on the Platform."],
      ["Storage Service", "The service through which HostelHubb facilitates the pickup, storage, and delivery of a Customer's personal belongings."],
      ["Logistics Service", "The pickup and delivery service HostelHubb provides or facilitates in connection with Storage Services or other bookings."],
      ["Booking", "A confirmed reservation for hostel accommodation, storage, or logistics made through the Platform."],
      ["Payment", "Any sum paid by a User through the Platform for accommodation, storage, delivery, or associated fees."],
      ["Account", "The registered profile a User creates to access the Platform's features."],
    ],
  },
  {
    title: "3. User Accounts",
    subsections: [
      {
        title: "3.1 Registration",
        body: [`To access most features of the Platform, you must create an Account and provide accurate, current, and complete information. You must be at least 13 years old to use the App.`],
      },
      {
        title: "3.2 Account Security",
        body: [`You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your Account. HostelHubb is not liable for any loss arising from your failure to secure your Account.`],
      },
      {
        title: "3.3 Suspension and Termination",
        body: [`HostelHubb may suspend or terminate any Account at its discretion where we reasonably believe these Terms, applicable law, or the rights of other Users have been violated.`],
      },
    ],
  },
  {
    title: "4. Hostel Accommodation Services",
    subsections: [
      {
        title: "4.1 HostelHubb as an Intermediary",
        body: [`HostelHubb provides a platform that connects Students with Hostel Providers. HostelHubb is not a party to, and assumes no responsibility for, the accommodation agreement formed between a Student and a Hostel Provider. Our role is limited to facilitating discovery, booking, and payment.`],
      },
      {
        title: "4.2 Listings, Pricing, and Availability",
        body: [`Hostel listings, amenities, pricing, and availability are provided by Hostel Providers. While we take reasonable steps to keep listings accurate, HostelHubb does not guarantee the completeness or accuracy of this information and encourages Students to confirm key details directly with the Hostel Provider before booking.`],
      },
      {
        title: "4.3 Reservation, Changes, and Cancellations",
        body: [`Bookings are confirmed once payment is completed and the Hostel Provider accepts the reservation. Cancellation, rebooking, and refund policies for accommodation are set individually by each Hostel Provider and communicated at the time of booking.`],
      },
      {
        title: "4.4 Responsibilities",
        body: [`Hostel Providers are responsible for the accuracy of their listings, the condition and safety of their accommodation, and honouring confirmed bookings. Students are responsible for providing accurate booking information and complying with the house rules of the accommodation they book.`],
      },
    ],
  },
  {
    title: "5. Storage Services",
    subsections: [
      { title: "5.1 How Storage Booking Works", body: [`Customers may book the Storage Service through the App by selecting a storage location, indicating the items to be stored, and completing payment. A booking receipt is issued upon successful payment.`] },
      { title: "5.2 Pickup and Delivery", body: [`HostelHubb arranges pickup of the Customer's belongings from the location specified at booking, and delivery back to the Customer upon request. Pickup and delivery windows are scheduled in coordination with the Customer and are subject to availability.`] },
      { title: "5.3 Accepted and Prohibited Items", body: [`Customers may store personal items such as clothing, books, electronics, luggage, and small furniture. The following items may not be stored: perishable food, illegal items, hazardous or flammable materials, firearms or weapons, live animals, and any item requiring special environmental conditions (e.g. refrigeration).`] },
      { title: "5.4 Accuracy of Item Information", body: [`Customers are responsible for accurately describing and declaring the items submitted for storage, including their value where relevant. HostelHubb reserves the right to inspect items at the point of pickup to confirm compliance with these Terms.`] },
      { title: "5.5 Storage Duration and Fees", body: [`Storage is billed according to the plan selected at booking (e.g. by duration or item volume). Fees, applicable taxes, and any charges for extended storage are disclosed to the Customer before payment is completed.`] },
      { title: "5.6 Retrieval Process", body: [`Customers may request the return of stored items at any time, subject to the operating hours of the relevant storage facility and reasonable advance notice for scheduling delivery.`] },
      { title: "5.7 Lost, Damaged, or Disputed Items", body: [`HostelHubb takes reasonable care in handling stored items and works only with verified storage facilities. In the event of loss or damage caused by our negligence or that of our Service Partners, HostelHubb's liability is limited to the declared value of the affected item, subject to the overall limitations set out in Section 13. Claims must be reported within [INSERT NUMBER] days of item return or scheduled return.`] },
      { title: "5.8 Unclaimed Items", body: [`Items not retrieved within [INSERT NUMBER] days after the expiry of a storage plan, and after reasonable attempts by HostelHubb to contact the Customer, may be treated as abandoned in accordance with our internal policy, a copy of which is available on request.`] },
    ],
  },
  {
    title: "6. Logistics and Delivery Services",
    body: [`Pickup and delivery under the Storage Service, or any standalone logistics request, are subject to the following:`],
    list: [
      `Delivery timelines communicated at booking are estimates and may be affected by traffic, weather, or other circumstances beyond HostelHubb's control;`,
      `Customers must ensure someone is available to receive or hand over items at the agreed time and location;`,
      `HostelHubb may engage third-party logistics or delivery partners to fulfil pickup and delivery requests, who are independently responsible for the services they render;`,
      `HostelHubb is not liable for delays caused by incomplete or inaccurate delivery information provided by the Customer; and`,
      `In the event of unforeseen delays, HostelHubb will make reasonable efforts to notify affected Customers as soon as practicable.`,
    ],
  },
  {
    title: "7. Payments and Fees",
    subsections: [
      { title: "7.1 Payment Methods", body: [`Payments on the Platform may be made through mobile money, debit or credit card, or other payment methods made available within the App from time to time.`] },
      { title: "7.2 Platform Fees", body: [`HostelHubb may charge service fees, commissions, or transaction charges on bookings, which are disclosed to Users before payment is finalised.`] },
      { title: "7.3 Refunds", body: [`Refunds for accommodation bookings follow the individual policy of the relevant Hostel Provider. Refunds for Storage or Logistics Services are assessed by HostelHubb on a case-by-case basis, in line with our Refunds, Cancellation, and Disputes provisions in Section 14.`] },
      { title: "7.4 Failed Payments and Outstanding Balances", body: [`Where a payment fails or a balance remains outstanding, HostelHubb reserves the right to suspend the related booking or service until payment is resolved.`] },
      { title: "7.5 Currency", body: [`All prices and fees on the Platform are stated in Ghana Cedis (GHS) unless otherwise indicated.`] },
    ],
  },
  {
    title: "8. User Conduct",
    body: [`When using the Platform, you agree not to:`],
    list: [
      `Provide false, misleading, or fraudulent information;`,
      `Use the Platform for any unlawful purpose or in violation of these Terms;`,
      `Attempt to circumvent the Platform to avoid applicable fees;`,
      `Interfere with the security or proper functioning of the App;`,
      `Harass, threaten, or abuse other Users, Hostel Providers, or Service Partners; or`,
      `Misuse the Storage or Logistics Service, including by submitting prohibited items.`,
    ],
    footer: [`Violation of this Section may result in suspension or termination of your Account, in addition to any other remedies available to HostelHubb.`],
  },
  {
    title: "9. Hostel Provider Terms",
    body: [`Hostel Providers who list accommodation on the Platform agree to:`],
    list: [
      `Provide accurate and up-to-date listing information, including pricing, availability, and amenities;`,
      `Maintain accommodation in a condition consistent with what is represented on the Platform;`,
      `Keep availability calendars current to avoid overbooking;`,
      `Honour confirmed bookings made through the Platform;`,
      `Comply with all applicable Ghanaian laws and regulations governing rented accommodation; and`,
      `Fulfil any commission or fee obligations owed to HostelHubb as agreed at onboarding.`,
    ],
  },
  {
    title: "10. Intellectual Property",
    body: [
      `The Platform, including its app, website, branding, logos, trademarks, software, and all associated content, is the exclusive property of NAG HOSTELHUBB and is protected under applicable copyright, trademark, and intellectual property laws.`,
      `Users are granted a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial purposes. You may not copy, reproduce, distribute, modify, reverse-engineer, or create derivative works from any part of the Platform without prior written consent from NAG HOSTELHUBB.`,
      `Unauthorised use of HostelHubb's intellectual property may result in suspension of your Account and legal action, including claims for damages.`,
    ],
  },
  {
    title: "11. Data Protection and Privacy",
    body: [
      `HostelHubb collects and processes personal information — including Account details, booking information, and payment information — in order to provide and improve the Platform's services.`,
      `We process personal data in accordance with Ghana's Data Protection Act, 2012 (Act 843), and our Privacy Policy, which forms part of these Terms. By using the Platform, you consent to the collection, use, and storage of your information as described in our Privacy Policy.`,
    ],
  },
  {
    title: "12. Disclaimers",
    body: [
      `The Platform is provided on an "as is" and "as available" basis. HostelHubb does not guarantee uninterrupted availability of the App and may experience downtime for maintenance or technical reasons.`,
      `HostelHubb does not guarantee the quality, safety, or suitability of any Hostel Provider's accommodation, and does not guarantee the performance of third-party logistics or Service Partners.`,
      `HostelHubb shall not be liable for delays or failures in performance resulting from events beyond its reasonable control, including but not limited to natural disasters, strikes, government action, power or network outages, or other force majeure events.`,
    ],
  },
  {
    title: "13. Limitation of Liability",
    body: [`To the fullest extent permitted by Ghanaian law, HostelHubb shall not be liable for:`],
    list: [
      `Any indirect, incidental, special, or consequential damages arising from use of the Platform;`,
      `Loss or damage caused by third-party Hostel Providers or Service Partners;`,
      `Loss or damage arising from a User's negligence or breach of these Terms; or`,
      `Loss or damage resulting from inaccurate or incomplete information provided by a User.`,
    ],
    footer: [`Where liability cannot be excluded under applicable law, HostelHubb's total liability in respect of any claim shall be limited to the amount paid by the User for the specific service giving rise to the claim.`],
  },
  {
    title: "14. Refunds, Cancellation, and Disputes",
    subsections: [
      { title: "14.1 Accommodation Bookings", body: [`Cancellation and refund eligibility for hostel bookings are governed by the individual Hostel Provider's policy, made available at the time of booking.`] },
      { title: "14.2 Storage Bookings", body: [`Storage bookings may be cancelled prior to scheduled pickup in accordance with the cancellation window disclosed in the App. Cancellations made after pickup has occurred are subject to partial or non-refundable fees, as disclosed at booking.`] },
      { title: "14.3 Payment Disputes", body: [`Users who dispute a charge should contact HostelHubb support in the first instance. We aim to investigate and resolve payment disputes within a reasonable time.`] },
      { title: "14.4 Resolution Process", body: [`Disputes arising from a Booking between a Student and a Hostel Provider must be resolved directly between those parties. Where a dispute concerns HostelHubb's Storage or Logistics Service, Users should first contact our support team; unresolved disputes will be handled in accordance with Section 16 (Governing Law).`] },
    ],
  },
  {
    title: "15. Account Suspension and Termination",
    body: [`HostelHubb may restrict access to, suspend, or terminate a User's Account, and may suspend a Hostel Provider's or Service Partner's participation on the Platform, where we reasonably believe that:`],
    list: [
      `These Terms or applicable law have been violated;`,
      `Fraudulent, abusive, or unlawful activity has occurred; or`,
      `Continued access poses a risk to HostelHubb, other Users, or the integrity of the Platform.`,
    ],
  },
  {
    title: "16. Governing Law",
    body: [`These Terms are governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising under this Agreement that cannot be resolved amicably shall be subject to the jurisdiction of the courts of Ghana, following applicable Ghanaian legal procedures.`],
  },
  {
    title: "17. Changes to Terms",
    body: [`HostelHubb reserves the right to modify, amend, or update these Terms at any time to reflect changes in the law, our services, or business operations. Material changes will be communicated through the App or by other reasonable means. Continued use of the Platform after changes take effect constitutes acceptance of the revised Terms.`],
  },
  {
    title: "18. Contact Information",
    body: [`For questions, concerns, or feedback regarding these Terms, please contact us:`],
    contact: [
      "Company: NAG HOSTELHUBB",
      "Email: support@hostelhubb.com",
    ],
    footer: [`We aim to respond to inquiries within 2–3 business days.`],
  },
];

export default function TermsAndConditions() {
  return (
    <main className="bg-white">

      <Navbar />

      {/* Header */}
      <section className="bg-teal-800 text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="uppercase tracking-[0.25em] text-sm text-teal-100">
            HostelHubb
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-white/80">
            Accommodation, Storage &amp; Logistics Services
          </p>
          <p className="mt-2 text-sm text-white/60">
            Effective Date: [INSERT EFFECTIVE DATE]
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-4xl mx-auto px-6 py-16">

        {SECTIONS.map((section) => (

          <div key={section.title} className="mb-14 scroll-mt-24" id={section.title}>

            <h2 className="text-2xl font-bold text-gray-900 border-b border-teal-100 pb-3">
              {section.title}
            </h2>

            {section.body?.map((para, i) => (
              <p key={i} className="mt-4 text-gray-600 leading-relaxed">
                {para}
              </p>
            ))}

            {section.list && (
              <ul className="mt-4 space-y-2">
                {section.list.map((li, i) => (
                  <li key={i} className="flex gap-3 text-gray-600 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-teal-700 shrink-0" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.table && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-teal-700 text-white text-left">
                      <th className="p-3 font-semibold w-1/3">Term</th>
                      <th className="p-3 font-semibold">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.map(([term, meaning], i) => (
                      <tr
                        key={term}
                        className={i % 2 === 0 ? "bg-teal-50/40" : "bg-white"}
                      >
                        <td className="p-3 font-medium text-gray-900 align-top">
                          {term}
                        </td>
                        <td className="p-3 text-gray-600 align-top">
                          {meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.contact && (
              <ul className="mt-4 space-y-1 text-gray-700">
                {section.contact.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}

            {section.footer?.map((para, i) => (
              <p key={i} className="mt-4 text-gray-600 leading-relaxed">
                {para}
              </p>
            ))}

            {section.subsections?.map((sub) => (
              <div key={sub.title} className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {sub.title}
                </h3>
                {sub.body?.map((para, i) => (
                  <p key={i} className="mt-2 text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
                {sub.list && (
                  <ul className="mt-2 space-y-2">
                    {sub.list.map((li, i) => (
                      <li key={i} className="flex gap-3 text-gray-600 leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-teal-700 shrink-0" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          </div>

        ))}

      </section>

    </main>
  );
}