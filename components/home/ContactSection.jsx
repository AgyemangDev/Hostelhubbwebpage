"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Mail, Phone, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "+233245746198"; // TODO: swap for HostelHubb's real WhatsApp number, digits only, country code first
const SUPPORT_EMAIL = "support@hostelhubb.com";

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.166L2.05 21.95l4.94-1.296A9.94 9.94 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.24a8.19 8.19 0 01-4.19-1.148l-.301-.179-3.12.818.833-3.043-.196-.312A8.19 8.19 0 013.76 12c0-4.552 3.688-8.24 8.24-8.24s8.24 3.688 8.24 8.24-3.688 8.24-8.24 8.24z"
      />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    from_name: "",
    email: "",
    phone: "",
    price_range: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text: string }

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid =
    formData.from_name.trim() !== "" &&
    isEmailValid(formData.email) &&
    formData.message.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);
    setStatus(null);

    emailjs
      .send(
        "service_ncxubhl",
        "template_nx3hieg",
        formData,
        "dskMrGvegne1xkNw5"
      )
      .then(
        () => {
          setStatus({ type: "success", text: "Message sent — we'll get back to you shortly." });
          setFormData({ from_name: "", email: "", phone: "", price_range: "", message: "" });
        },
        () => {
          setStatus({ type: "error", text: "Something went wrong. Please try again or reach us on WhatsApp." });
        }
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="max-w-2xl"
      >
        <p className="text-sm uppercase tracking-widest text-[#0F766E]">
          Get in touch
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-ink">
          Need help with hostels, transport, or storage in Ghana?
        </h2>
        <p className="mt-4 text-ink-soft">
          Whether you're booking a hostel near your university, arranging
          transport for reopening, or storing your things over break, the
          HostelHubb team is here to help students across Ghana.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        {/* Info panel */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-[#134E4A] via-[#0F766E] to-[#0d5c56] p-8 text-white"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#5eead4]">
            We're here to help
          </p>
          <h3 className="mt-4 text-2xl font-semibold">Talk to HostelHubb</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Most messages get a reply within a few hours. For anything
            urgent — a same-day booking or a transport question — WhatsApp
            is fastest.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi HostelHubb, I need help with..."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 font-semibold text-[#0d5c56] transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-5 w-5 flex-none" />
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center gap-3 rounded-xl border border-white/30 px-5 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Mail size={18} className="flex-none" />
              {SUPPORT_EMAIL}
            </a>
          </div>

          <div className="mt-10 space-y-4 border-t border-white/15 pt-6">
            <div className="flex items-center gap-3 text-sm text-white/80">
              <Clock size={16} className="flex-none text-[#5eead4]" />
              Typical response time: under 1 hour
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <Phone size={16} className="flex-none text-[#5eead4]" />
              Supporting students across 8 campuses in Ghana
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="lg:col-span-3 rounded-3xl border border-line bg-paper-raised p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="from_name" className="block text-sm font-medium text-ink">
                  Name <span className="text-maroon">*</span>
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="mt-1.5 block w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink">
                  Email <span className="text-maroon">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-1.5 block w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-ink">
                  Phone <span className="text-ink-soft font-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+233 ..."
                  className="mt-1.5 block w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label htmlFor="price_range" className="block text-sm font-medium text-ink">
                  Budget <span className="text-ink-soft font-normal">(optional)</span>
                </label>
                <input
                  id="price_range"
                  name="price_range"
                  type="text"
                  value={formData.price_range}
                  onChange={handleChange}
                  placeholder="e.g. GHS 800 – 1,200 / semester"
                  className="mt-1.5 block w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink">
                Message <span className="text-maroon">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you need — hostel, transport, or storage"
                className="mt-1.5 block w-full resize-none rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-[#0F766E]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="w-full rounded-xl bg-[#0F766E] py-3 font-semibold text-white transition-colors hover:bg-[#0d5c56] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>

            {status && (
              <div
                role="status"
                aria-live="polite"
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={16} className="flex-none" />
                ) : (
                  <AlertCircle size={16} className="flex-none" />
                )}
                {status.text}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}