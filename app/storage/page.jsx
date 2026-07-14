import Footer from "@/components/Footer";

import StorageHero from "@/components/storage/StorageHero";
import StorageProcess from "@/components/storage/StorageProcess";
import StorageFeatures from "@/components/storage/StorageFeatures";
import StorageFAQ from "@/components/storage/StorageFAQ";
import StorageCTA from "@/components/storage/StorageCTA";


export const metadata = {
  title:
    "Student Storage in Ghana | Secure Semester Break Storage | HostelHubb",

  description:
    "Store your belongings safely during semester breaks, hostel changes, internships and travel. HostelHubb provides secure student storage solutions across Ghana.",

  keywords: [
    "student storage Ghana",
    "hostel storage Ghana",
    "semester break storage",
    "student luggage storage",
    "campus storage",
    "KNUST storage",
    "University of Ghana storage",
    "HostelHubb storage",
  ],

  alternates: {
    canonical: "/storage",
  },

  openGraph: {
    title:
      "Secure Student Storage in Ghana | HostelHubb",

    description:
      "Keep your belongings safe between semesters with flexible student storage solutions from HostelHubb.",

    url: "https://hostelhubb.com/storage",

    siteName: "HostelHubb",

    type: "website",

    images: [
      {
        url: "https://hostelhubb.com/images/storage-og.jpg",
        width: 1200,
        height: 630,
        alt: "HostelHubb student storage service",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Student Storage in Ghana | HostelHubb",

    description:
      "Secure storage for students during semester breaks and hostel moves.",

    images: [
      "https://hostelhubb.com/images/storage-og.jpg",
    ],
  },
};


export default function StoragePage() {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "HostelHubb Student Storage",

    description:
      "Secure storage solutions for students in Ghana during semester breaks, relocation and travel.",

    provider: {
      "@type": "Organization",
      name: "HostelHubb",
      url: "https://hostelhubb.com",
    },

    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },

    serviceType:
      "Student Storage Service",
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main>

        <StorageHero />

        <StorageProcess />

        <StorageFeatures />

        <StorageFAQ />

        <StorageCTA />

      </main>

      <Footer />

    </>
  );
}