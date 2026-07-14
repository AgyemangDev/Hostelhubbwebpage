import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import SmartAppBanner from "@/components/SmartAppBanner";
import TawkTo from "@/components/TawkTo";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hostelhubb.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HostelHubb — Verified Student Hostels, Transport & Storage in Ghana",
    template: "%s | HostelHubb",
  },
  description:
    "HostelHubb helps Ghanaian students find verified hostels near KNUST, University of Ghana, UCC and campuses nationwide, book reliable transport for vacation and reopening, and store belongings safely between semesters — all in one platform.",
  keywords: [
    "student hostels Ghana",
    "hostel booking KNUST",
    "hostel booking Legon",
    "hostel booking UCC",
    "campus transport Ghana",
    "student storage Ghana",
    "luggage storage university Ghana",
    "vacation transport students Ghana",
    "hostel accommodation Ghana",
    "move to campus Ghana",
    "cheap hostel near KNUST",
    "affordable hostel Legon",
    "hostel prices Ghana",
    "one in a room hostel Kumasi",
    "two in a room hostel Accra",
    "private hostel vs university hall Ghana",
    "off campus hostel Ghana",
    "reopening transport Ghana students",
    "vacation bus students Ghana",
    "where to keep luggage during vacation Ghana",
    "hostel near UCC campus",
    "hostel near UDS Tamale",
    "hostel near UEW Winneba",
    "hostel near GIMPA",
    "student bedspace Ghana",
    "verified hostel Ghana app",
  ],
  openGraph: {
    type: "website",
    siteName: "HostelHubb",
    locale: "en_GH",
    url: SITE_URL,
    title: "HostelHubb — Verified Hostels, Transport & Storage for Ghanaian Students",
    description:
      "Find verified hostels, book campus transport, and store your belongings safely — all in one app for students across Ghana.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HostelHubb",
  url: SITE_URL,
  description:
    "HostelHubb offers verified student hostel booking, campus transport, and secure storage services across universities in Ghana.",
  areaServed: "Ghana",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Student Hostel Booking" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Campus Transport Booking" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Student Storage Service" },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
        <AuthProvider>
          <SmartAppBanner />
          {children}
        </AuthProvider>
        <TawkTo />
      </body>
    </html>
  );
}