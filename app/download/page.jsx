import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import DownloadApp from "@/components/home/DownloadApp";
import ServicesSection from "@/components/home/ServicesSection";

// Display face carries the brand's personality; body stays quiet and legible;
// mono is reserved for eyebrows, step numbers, and small data-like labels.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
});

const SITE_URL = "https://hostelhubb.com";
const OG_IMAGE = `${SITE_URL}/og/download.jpg`;

export const metadata = {
  title: "Download HostelHubb — Hostel Booking, Transport & Payments App | Ghana",
  description:
    "Get the HostelHubb app for iOS and Android. Book verified student hostels, arrange campus transport, store your things, and pay securely — all in one app built for Ghana's campuses.",
  keywords: [
    "HostelHubb",
    "hostel booking Ghana",
    "Trusted storage services",
    "student hostel app",
    "campus transport Ghana",
    "student accommodation app",
    "hostel payments app",
  ],
  alternates: {
    canonical: `${SITE_URL}/download`,
  },
  openGraph: {
    title: "Download HostelHubb — One App for Hostel Life",
    description:
      "Book verified hostels, campus transport, storage, and secure payments in one app. Available now on the App Store and Google Play.",
    url: `${SITE_URL}/download`,
    siteName: "HostelHubb",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "HostelHubb app on iOS and Android",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download HostelHubb — One App for Hostel Life",
    description:
      "Book verified hostels, campus transport, storage, and secure payments in one app.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DownloadPage() {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <ServicesSection/>
      <DownloadApp/>
    </div>
  );
}