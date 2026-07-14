import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import UniversityRail from "@/components/home/UniversityRail";

import HeroBanner from "@/components/home/HeroBanner";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DownloadApp from "@/components/home/DownloadApp";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import ContactSection from "@/components/home/ContactSection";


export const metadata = {
  title: "HostelHubb | Verified Hostels, Transport & Storage for Ghanaian Students",
  description:
    "Book verified student hostels, reliable campus transport for vacation and reopening, and secure storage for your belongings — HostelHubb serves KNUST, Legon, UCC, UDS, GIMPA and universities across Ghana.",
};


export default function HomePage() {

  return (
    <>
      <Navbar />

      <main className="pt-24">

        <HeroBanner />

        {/* <UniversityRail /> */}

        <ServicesSection />

        <WhyChooseUs />

        <DownloadApp />

        <WhatsAppCTA />

        <ContactSection />

      </main>

      <Footer />

    </>
  );
}