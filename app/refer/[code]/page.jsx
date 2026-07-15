import ReferLanding from "@/components/ReferLanding";

export async function generateMetadata({ params }) {
  const { code } = await params; // drop `await` if on Next 14
  const imageUrl = `/api/referral-card?code=${encodeURIComponent(code)}`;

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
      url: `/refer/${code}`,
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

export default async function ReferralPage({ params }) {
  const { code } = await params; // drop `await` if on Next 14
  return <ReferLanding code={code} />;
}