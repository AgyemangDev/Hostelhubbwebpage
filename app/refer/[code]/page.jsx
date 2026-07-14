const SITE_URL = "https://hostelhubb.com";

export async function generateMetadata({ params }) {
  const { code } = params;
  const imageUrl = `${SITE_URL}/api/referral-card?code=${encodeURIComponent(code)}`;

  const title = `Join me on HostelHubb — use code ${code}`;
  const description =
    "Book verified hostels, campus transport, and secure storage — all in one app for students across Ghana.";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "HostelHubb",
      locale: "en_GH",
      url: `${SITE_URL}/refer/${code}`,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ReferralPage({ params }) {
  const { code } = params;

  return (
    <div style={{ padding: 40, textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>You&apos;ve been invited to HostelHubb</h1>
      <p>Use referral code <strong>{code}</strong> when you book to credit your friend.</p>
      <p>
        <a href="https://apps.apple.com/app/hostelhubb" style={{ marginRight: 16 }}>
          Download on the App Store
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.hostelhubb">
          Get it on Google Play
        </a>
      </p>
    </div>
  );
}