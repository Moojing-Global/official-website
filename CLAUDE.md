# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This is an **early-stage MVP** for a B2B tech company website with blogging capabilities. The codebase is lean and optimized for future expansion.

**Current State:**
- ✅ Astro v5 + TypeScript + Tailwind CSS v4 foundation
- ✅ Blog with content collections and Pages CMS integration
- ✅ SEO meta tags and structured data (article schema)
- ✅ Cloudflare Pages deployment configuration
- ⚠️ Homepage is "Coming Soon" placeholder
- ⚠️ Minimal components (no header, footer, navigation)
- ⚠️ Static images only (no optimization)

**Key Metrics:**
- Build time: ~1.25s
- TypeScript errors: 0
- Source files: ~14
- Code lines: ~327

## Development Commands

All commands use `bun` as the package manager:

- `bun install` - Install dependencies
- `bun dev` - Start development server at `localhost:4321`
- `bun build` - Build production site to `./dist/`
- `bun preview` - Preview production build locally
- `bun astro check` - Run TypeScript type checking

## Architecture Overview

This is an Astro v5 static site built with TypeScript and Tailwind CSS v4, configured for deployment to Cloudflare Pages. The site includes a blog powered by Astro's content collections and integrates with Pages CMS for content management.

### Content Management System Integration

The project uses **Pages CMS** (configured via `.pages.yml`) for content editing:

- Media files are managed through Pages CMS at `public/media/` (output path `/media`)
- Blog posts are stored in `src/content/blog/` as markdown files
- Content schema is defined in both `src/content/config.ts` (Astro) and `.pages.yml` (Pages CMS)
- Tags can be entered as comma-separated strings in Pages CMS and are automatically parsed to arrays

### Image Handling

The project uses a **simple static image approach**:

- **Pages CMS uploads to**: `public/media/` (static files, served at `/media/` URL)
- Images are referenced directly in markdown content and frontmatter using `/media/` paths
- No build-time image optimization currently implemented
- Images are served as-is from the static public directory

**Note:** Image optimization utilities (lazy loading, responsive images, WebP conversion) are not yet implemented but are planned for future enhancement.

### TypeScript Path Aliases

Configured in `tsconfig.json`:

- `@components/*` maps to `./src/components/*`
- `@layouts/*` maps to `./src/layouts/*`

### SEO and Metadata

- Global site configuration in `src/config/siteConfig.ts`
- SEO component at `src/components/BaseHead.astro` handles meta tags, Open Graph, and Twitter cards
- Image URLs are automatically encoded to handle spaces and special characters in filenames
- MainLayout (`src/layouts/MainLayout.astro`) accepts props: `title`, `description`, `canonical`, `image`, `imageAlt`, `type`, `noindex`, `author`, `pubDate`
- For article pages:
  - `author` (string) is used to add `author` and `article:author` meta tags for SEO
  - `pubDate` is used to add `article:published_time` meta tag for SEO

### Content Collections

Blog collection schema (`src/content/config.ts`):

- `title: string` (required)
- `pubDate: date` (required)
- `description: string` (optional)
- `featured_image: string` (optional)
- `author: string` (optional) - Simple author name string for SEO purposes
- `tags: string | string[]` (optional) - Comma-separated tags, automatically parsed to arrays

### Deployment

Configured for **Cloudflare Pages** with the adapter `@astrojs/cloudflare` using compile-time image service (no runtime image optimization on Cloudflare).

### Integrations

- `@astrojs/mdx` - MDX support
- `@astrojs/sitemap` - Automatic sitemap generation (uses `siteConfig.url`)
- `astro-icon` - Icon system using Iconify (@iconify-json/tabler)
- Tailwind CSS v4 via Vite plugin
