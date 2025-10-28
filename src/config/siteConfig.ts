/**
 * Site Configuration
 * Default SEO and site metadata
 */

export const siteConfig = {
  // Site Info
  name: "My Astro Website",
  url: "https://www.example.com",

  // Default SEO
  title: "My Astro Website",
  description: "Welcome to my new Astro site!",
  author: "Your Name",

  // Default Open Graph Image
  ogImage: {
    src: "/og-image.jpg",
    alt: "My Astro Website",
  },

  // Social Links (optional)
  social: {
    facebook: "https://www.facebook.com/yourpage",
    linkedin: "https://www.linkedin.com/company/yourcompany",
  },
} as const;

export type SiteConfig = typeof siteConfig;
