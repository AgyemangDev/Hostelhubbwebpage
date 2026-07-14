const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hostelhubb.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/login", "/api/*"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
