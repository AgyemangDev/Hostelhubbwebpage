import React from "react";
import { motion } from "framer-motion";
import WhatsAppLogo from "../assets/whatsapp-logo.png";
import { MessageCircle, Gift, Bell, Headphones } from "lucide-react";

const WhatsAppPage = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, threshold: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Join Our WhatsApp Channel
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay connected with us for the latest updates, exclusive deals, and instant support
          </p>
        </motion.div>

        {/* Main Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, threshold: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 p-8 md:p-12 bg-gradient-to-r from-accent to-secondary text-white rounded-lg shadow-2xl transform hover:scale-105 transition-transform"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <motion.div
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            >
              <img
                src={WhatsAppLogo}
                alt="WhatsApp Logo"
                className="w-14 h-14"
              />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-semibold">
              Connect With Us on WhatsApp
            </h3>
            <p className="text-white/90 text-base md:text-lg max-w-2xl">
              Get instant notifications about new hostels, storage options, exclusive deals, 
              and direct access to our customer support team. Join our growing community today!
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <motion.a
                href="https://whatsapp.com/channel/0029VavI8Yv5fM5e7ydw7i1W"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-secondary text-lg font-semibold rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="mr-2" size={20} />
                Join Channel Now
              </motion.a>
              
              <motion.a
                href="https://wa.me/0029VavI8Yv5fM5e7ydw7i1W"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-secondary transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Headphones className="mr-2" size={20} />
                Contact Support
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <FeatureCard
            Icon={Bell}
            title="Instant Updates"
            description="Get real-time notifications about new listings and availability"
            index={0}
          />
          <FeatureCard
            Icon={Gift}
            title="Exclusive Deals"
            description="Access special offers and discounts available only to channel members"
            index={1}
          />
          <FeatureCard
            Icon={Headphones}
            title="24/7 Support"
            description="Need help joining? Contact our customer service at the same WhatsApp number"
            index={2}
          />
        </div>

        {/* Bottom Info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-gray-500 text-sm mt-10 text-center"
        >
          Join thousands of members already connected with HostelHubb
        </motion.p>
      </div>
    </section>
  );
};

const FeatureCard = ({ Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, threshold: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-2xl"
    >
      <div className="text-4xl mb-3">
        <Icon size={48} className="mx-auto text-accent" />
      </div>
      <h3 className="text-xl font-semibold text-secondary text-center">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm md:text-base text-center">{description}</p>
    </motion.div>
  );
};

export default WhatsAppPage;
