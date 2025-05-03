import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Map,
  Trophy,
  Users,
  Target,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

const featuresData = [
  {
    title: "Decent Maps",
    description:
      "Our interactive maps make it easy for clients to find hostels and navigate their surroundings effortlessly.",
    icon: Map,
  },
  {
    title: "Client Satisfaction",
    description:
      "We consistently receive 5.0-star ratings from our satisfied clients.",
    icon: Trophy,
  },
  {
    title: "Happy Clients",
    description:
      "Over 10K+ happy clients have experienced the HostelHubb difference.",
    icon: Users,
  },
  {
    title: "User Prioritization",
    description:
      "We're dedicated to user satisfaction, with a 100% focus on delivering a seamless experience.",
    icon: Target,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is available 24/7 to assist you with any inquiries.",
    icon: PhoneCall,
  },
];

const Features = () => {
  const [bannerRef, bannerInView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const bannerControls = useAnimation();

  useEffect(() => {
    if (bannerInView) {
      bannerControls.start({ opacity: 1, y: 0, scale: 1 });
    } else {
      bannerControls.start({ opacity: 0, y: 50, scale: 0.9 });
    }
  }, [bannerInView, bannerControls]);

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-10 text-secondary">
          Our Achievements
        </h2>

        {/* Banner for the top feature */}
        <motion.div
          ref={bannerRef}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={bannerControls}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 p-6 md:p-8 bg-gradient-to-r from-accent to-secondary text-white rounded-lg shadow-2xl transform hover:scale-105 transition-transform"
        >
          <div className="text-5xl mb-3">
            <CheckCircle size={64} className="mx-auto" />
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold">Why Choose Us?</h3>
          <p className="mt-2 text-sm md:text-base">
            With over 10K+ active clients and a consistent 5.0-star rating, our
            applications prioritize user satisfaction and deliver exceptional
            results. Join the community experiencing the HostelHubb difference
            today!
          </p>
        </motion.div>

        {/* Cards for the remaining features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuresData.slice(1).map((feature, index) => (
            <FeatureCard
              key={index}
              Icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ Icon, title, description, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={controls}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
    >
      <div className="text-4xl mb-3">
        <Icon size={48} className="mx-auto text-accent" />
      </div>
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <p className="mt-1 text-gray-600 text-sm md:text-base">{description}</p>
    </motion.div>
  );
};

export default Features;
