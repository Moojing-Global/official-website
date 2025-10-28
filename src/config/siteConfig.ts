/**
 * Site Configuration
 * Default SEO and site metadata
 *
 * Edit the configuration through Pages CMS or by modifying siteConfig.json
 * This file provides TypeScript type safety for the JSON configuration
 */

import siteConfigData from "./siteConfig.json";

// Define the type structure
export interface SiteConfig {
  name: string;
  url: string;
  title: string;
  description: string;
  ogImage: {
    src: string;
    alt: string;
  };
  social: {
    facebook?: string;
    linkedin?: string;
  };
}

// Export the typed config
export const siteConfig: SiteConfig = siteConfigData;
