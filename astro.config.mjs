// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import { siteConfig } from "./src/config/siteConfig";

// https://astro.build/config
export default defineConfig({
    site: siteConfig.url,

    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [icon(), sitemap(), mdx()],
    adapter: cloudflare({
        imageService: 'compile'
    }),
});
