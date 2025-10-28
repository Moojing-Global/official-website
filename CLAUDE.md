# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

### Image Handling Architecture

The project has a **dual-path image system** to support both Astro's native optimization and Pages CMS workflow:

1. **Pages CMS uploads to**: `public/media/` (static files, served at `/media/` URL)
2. **Astro processes from**: `src/media/` (for build-time optimization)

**Key utilities** (in `src/utils/`):

- `imageLoader.ts` - Loads images from `src/media/` using Vite's import.meta.glob for Astro Image optimization
- `remarkMediaImages.ts` - Remark plugin that transforms `/media/` paths to Vite's `/@fs/` paths for markdown processing
- `rehypeOptimizeImages.ts` - Rehype plugin that adds lazy loading and async decoding to img tags

**Migration script**:

- `scripts/copy-media.js` - Copies files from `src/media/` to `public/media/` (for backward compatibility)

**MarkdownImage component** (`src/components/MarkdownImage.astro`) - Use this component to render optimized images from markdown frontmatter paths.

### TypeScript Path Aliases

Configured in `tsconfig.json`:

- `@components/*` maps to `./src/components/*`
- `@layouts/*` maps to `./src/layouts/*`

### SEO and Metadata

- Global site configuration in `src/config/siteConfig.ts`
- SEO component at `src/components/head.astro` handles meta tags, Open Graph, and Twitter cards
- MainLayout (`src/layouts/MainLayout.astro`) accepts props: `title`, `description`, `canonical`, `image`, `imageAlt`, `type`, `noindex`

### Content Collections

Blog collection schema (`src/content/config.ts`):

- `title: string` (required)
- `pubDate: date` (required)
- `description: string` (optional)
- `tags: string | string[]` (optional) - Automatically transforms comma-separated strings to arrays

### Deployment

Configured for **Cloudflare Pages** with the adapter `@astrojs/cloudflare` using compile-time image service (no runtime image optimization on Cloudflare).

### Integrations

- `@astrojs/mdx` - MDX support
- `@astrojs/sitemap` - Automatic sitemap generation (uses `siteConfig.url`)
- `astro-icon` - Icon system using Iconify (@iconify-json/tabler)
- Tailwind CSS v4 via Vite plugin
