/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "cdn.cheapoguides.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Every accommodation slug must survive forever (SEO permanence).
  // If a slug ever changes upstream, add a redirect entry here instead of breaking the URL.
  async redirects() {
    return [];
  },
};

export default nextConfig;