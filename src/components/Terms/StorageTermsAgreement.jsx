import React from "react";

const StorageTermsAgreement = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Hostelhubb Storage Terms and Agreement</h1>
      <p><strong>Effective Date:</strong> 8th July, 2025</p>

      <p>
        Welcome to <strong>Hostelhubb Storage</strong>, a dedicated branch of Hostelhubb providing secure and affordable storage solutions for students of Kwame Nkrumah University of Science and Technology (KNUST) during academic breaks. By booking storage with us via the Hostelhubb mobile application or website, you agree to the following terms and conditions.
      </p>

      <section style={styles.section}>
        <h2>1. Overview of Services</h2>
        <ul>
          <li><strong>Semester-Based Operations:</strong></li>
          <ul>
            <li><em>First Semester:</em> Pickups and deliveries are conducted directly in university halls, as students typically return to their halls after the break.</li>
            <li><em>Second Semester:</em> Students often move off-campus to hostels. Deliveries will be made to designated centers chosen by students during booking.</li>
          </ul>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>2. Bookings, Payment & Deliveries</h2>
        <ul>
          <li>All bookings must be made through the Hostelhubb Mobile Application.</li>
          <li>Storage fees must be paid in full to confirm your booking.</li>
          <li>Orders are only guaranteed upon receipt of payment.</li>
          <li>Deliveries are made strictly on the scheduled date chosen at booking.</li>
          <li>Students must present their e-receipt (digital or printed) to retrieve items.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>3. Pickup and Delivery Procedures</h2>
        <ul>
          <li><strong>First Semester:</strong> Door-to-door pickup in university halls.</li>
          <li><strong>Second Semester:</strong> Drop-off at designated locations selected by the student.</li>
          <li>Students must be present at the drop-off point or authorize someone to collect items on their behalf.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>4. Late Pickup Fees</h2>
        <p>
          If a student fails to collect their stored items on the designated delivery day, <strong>late pickup fees</strong> will apply as follows:
        </p>
        <h3>Fee Calculation</h3>
        <p>
          <strong>Daily Penalty Formula:</strong><br />
          <code>Late Fee = 0.5 × (Storage Fee) × (Number of Days Late)</code>
        </p>
        <h3>Example</h3>
        <p>
          If your storage fee is GH₵100 and you are 3 days late:<br />
          <code>0.5 × 100 × 3 = GH₵150</code><br />
          So, the total late fee would be <strong>GH₵150</strong>.
        </p>
        <h3>Important Details</h3>
        <ul>
          <li>The late fee is <strong>charged per day</strong> after the scheduled delivery date.</li>
          <li>Hostelhubb may <strong>withhold delivery</strong> of your items until all late fees are paid in full.</li>
          <li>The calculation is based on <strong>half the original storage fee</strong> multiplied by the number of days late.</li>
        </ul>
        <h3>Policy Reminders</h3>
        <ul>
          <li>Students are encouraged to pick up their items on the scheduled date to avoid additional charges.</li>
          <li>If items are not collected within <strong>14 days</strong> after the delivery date, they may be considered abandoned and subject to forfeiture.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>5. Item Packing & Labeling</h2>
        <ul>
          <li>Students are responsible for securely packing their belongings.</li>
          <li>All items must be clearly labeled with:
            <ul>
              <li>Full name</li>
              <li>Phone number</li>
              <li>Student ID</li>
            </ul>
          </li>
          <li>Hostelhubb is not liable for damage due to poor packaging or unlabeled items.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>6. Prohibited Items</h2>
        <p>The following are <strong>strictly prohibited</strong>:</p>
        <ul>
          <li>Perishables or food items</li>
          <li>Flammable or hazardous substances</li>
          <li>Firearms, ammunition, or weapons</li>
          <li>Illegal drugs or contraband</li>
          <li>Cash, gold, jewelry, or high-value electronics (unless pre-declared and approved)</li>
        </ul>
        <p><em>Prohibited items may be confiscated or reported to authorities if found.</em></p>
      </section>

<section style={styles.section}>
  <h2 style={styles.sectionTitle}>7. Liability & Insurance</h2>
  <ul>
    <li>Hostelhubb takes reasonable care in handling all items.</li>
    <li>
      We are not liable for loss, theft, or damage resulting from:
      <ul>
        <li>Improper packing by the student</li>
        <li>Acts of God (e.g., floods, fire, theft)</li>
        <li>Delays beyond our control (e.g., strikes, road closures)</li>
      </ul>
    </li>
    <li>
      <strong>Hostelhubb does not provide insurance for stored items.</strong> Students are strongly advised to secure personal insurance if desired.
    </li>

  </ul>
</section>


      <section style={styles.section}>
        <h2>8. Cancellations & Refund Policy</h2>
        <ul>
          <li>Cancellations ≥48 hours before pickup: <strong>50% refund</strong></li>
          <li>Cancellations &lt;48 hours before pickup: <strong>Non-refundable</strong></li>
          <li>No refunds for unused storage days or early retrieval.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>9. Abandoned Property & Forfeiture</h2>
        <ul>
          <li>Items uncollected within 14 days after delivery are considered abandoned.</li>
          <li>Hostelhubb may donate, discard, or auction abandoned items to recover costs.</li>
          <li>Reminders will be sent before final forfeiture.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>10. Automatic Renewal Clause</h2>
        <p>
          This agreement automatically renews each semester unless cancelled or modified in writing before the next academic break.
        </p>
      </section>

      <section style={styles.section}>
        <h2>11. Promotions & Use of Student Data</h2>
        <p>
          Hostelhubb may use hall/hostel details, storage statistics, or feedback for marketing or promotional purposes. Personal data is managed in line with our Privacy Policy.
        </p>
      </section>

      <section style={styles.section}>
        <h2>12. Communication</h2>
        <ul>
          <li>All communication (reminders, updates, schedule changes) will be sent via Email, and push notifications.</li>
          <li>Students must keep their contact information up to date.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>13. Acceptance of Terms</h2>
        <p>
          By completing your booking, you acknowledge that you have read and understood these terms, agree to abide by all rules outlined, and accept responsibility for any non-compliance.
        </p>
      </section>

      <section style={styles.section}>
        <h2>14. Additional Recommendations</h2>
        <ul>
          <li>Students are encouraged to inspect items immediately upon delivery and report any concerns within 24 hours.</li>
          <li>Hostelhubb is not responsible for delays or failures caused by events beyond its control (Force Majeure).</li>
          <li>Terms and conditions may be updated periodically. Continued use constitutes acceptance of revised terms.</li>
        </ul>
      </section>

      <section style={styles.section}>
<button
  onClick={() => window.location.href = 'mailto:hostelhubbofficial@gmail.com'}
  style={{
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  }}
>
  📧 Contact Hostelhubb Support
</button>
      </section>
    </div>
  );
};

const styles = {
 container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "24px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "16px", // increased for better readability
    lineHeight: 1.75,
    color: "#222",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "32px",
    color: "#007AFF",
  },
  section: {
    marginBottom: "32px", // More spacing between sections
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#333",
  },
  paragraph: {
    marginBottom: "12px",
  },
};

export default StorageTermsAgreement;
