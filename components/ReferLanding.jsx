"use client";

import { useOpenApp, isAppPlatform } from "@/lib/useOpenApp";

export default function ReferLanding({ code }) {
  const { handleClick, isModalOpen, closeModal } = useOpenApp(`hostelhubb://refer/${code}`);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>HOSTEL HUBB</div>

        <h1 style={styles.heading}>You&apos;ve been invited to HostelHubb</h1>
        <p style={styles.subtext}>
          Verified hostels, campus transport, and secure storage — all in one app for students
          across Ghana.
        </p>

        <div style={styles.codeBox}>
          <span style={styles.codeLabel}>Referral code</span>
          <span style={styles.codeValue}>{code}</span>
        </div>

        <button style={styles.cta} onClick={handleClick}>
          {isAppPlatform() ? "Open in HostelHubb App" : "Get the HostelHubb App"}
        </button>

        <p style={styles.hint}>
          Enter the referral code anytime you are booking a service.
        </p>
      </div>

      {isModalOpen && (
        <div style={styles.overlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalHeading}>Get HostelHubb</h2>
            <p style={styles.modalText}>
              Download the app on your phone, then enter code <strong>{code}</strong> when you
              sign up.
            </p>
            <div style={styles.storeRow}>
              <a
                href="https://apps.apple.com/us/app/hostelhubb/id6738483533"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.storeLink}
              >
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.storeLink}
              >
                Google Play
              </a>
            </div>
            <button style={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FDFBFA",
    fontFamily: "sans-serif",
  },
  card: {
    maxWidth: 420,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 32,
    textAlign: "center",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#B3261E",
    color: "#fff",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 1,
    padding: "6px 14px",
    borderRadius: 999,
    marginBottom: 20,
  },
  heading: { fontSize: 22, fontWeight: 700, margin: "0 0 10px", color: "#1A1A1A" },
  subtext: { fontSize: 14, color: "#6B6B6B", lineHeight: 1.5, margin: "0 0 24px" },
  codeBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F3F8F6",
    border: "1.5px solid #DCEBE6",
    borderRadius: 12,
    padding: "14px 20px",
    marginBottom: 24,
  },
  codeLabel: { fontSize: 12, color: "#6B6B6B" },
  codeValue: { fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#0F7A5C" },
  cta: {
    width: "100%",
    padding: "14px 20px",
    backgroundColor: "#B3261E",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  hint: { fontSize: 12, color: "#9A9A9A", marginTop: 16 },
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    zIndex: 50,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    maxWidth: 360,
    width: "100%",
    textAlign: "center",
  },
  modalHeading: { fontSize: 18, fontWeight: 700, margin: "0 0 10px" },
  modalText: { fontSize: 14, color: "#6B6B6B", lineHeight: 1.5, margin: "0 0 20px" },
  storeRow: { display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 },
  storeLink: {
    flex: 1,
    padding: "10px 14px",
    backgroundColor: "#1A1A1A",
    color: "#fff",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#9A9A9A",
    fontSize: 13,
    cursor: "pointer",
  },
};