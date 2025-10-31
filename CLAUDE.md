# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This is an **early-stage MVP** for a B2B tech company website with blogging capabilities. The codebase is lean and optimized for future expansion.

**Current State:**
- ✅ Astro v5 + TypeScript + Tailwind CSS v4 foundation
- ✅ Starwind component system for UI components
- ✅ Accessible navbar with dropdowns (MoInsights, MoEnterprise product suites)
- ✅ Dark mode toggle (Tabler icons via astro-icon)
- ✅ Navigation via hand-coded navConfig.json (Hugo-style)
- ✅ Blog with content collections and Pages CMS integration
- ✅ SEO meta tags and structured data (article schema)
- ✅ Cloudflare Pages deployment configuration
- ⚠️ Homepage is "Coming Soon" placeholder
- ⚠️ Minimal components (no footer)
- ⚠️ Static images only (no optimization)
- ⚠️ Clean slate pages ready for Starwind component integration

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
- `bun astro check` - Run TypeScript type checking (checks all .astro and .ts files)

## Architecture Overview

This is an Astro v5 static site built with TypeScript and Tailwind CSS v4, configured for deployment to Cloudflare Pages. The site includes a blog powered by Astro's content collections and integrates with Pages CMS for content management.

### Content Management System Integration

The project uses **Pages CMS** (configured via `.pages.yml`) for content editing:

- **Blog Posts**: Managed as a collection in Pages CMS, stored in `src/content/blog/`
- **Site Configuration**: Editable JSON file at `src/config/siteConfig.json` (also manageable via CMS)
- **Media Files**: Upload through Pages CMS to `public/media/` (served at `/media/` URL)
- **Schema Synchronization**: Content schema must be kept in sync between `src/content/config.ts` (Astro) and `.pages.yml` (Pages CMS)
- **Tag Parsing**: Tags entered as comma-separated strings in Pages CMS are automatically parsed to arrays via Zod transform in `src/content/config.ts`

### Image Handling

The project uses a **hybrid image optimization strategy**:

**Static/Component Images** (Optimized):
- **Location**: `src/assets/brand/` - Brand assets like logos, wordmarks
- **Usage**: Import in components → Use Astro's `<Image>` component
- **Optimization**: Build-time WebP conversion, responsive images via Sharp
- **Example**: Logo component imports and optimizes brand assets automatically

**CMS/Blog Content Images** (Static):
- **Location**: `public/media/` - Blog images, content uploads
- **Upload**: Pages CMS uploads directly to `public/media/` (served at `/media/` URL)
- **Usage**: Reference in markdown: `![Alt text](/media/image.jpg)` or frontmatter: `featured_image: /media/image.jpg`
- **Optimization**: None - served as-is from public directory
- **Recommendation**: Pre-optimize images before upload (TinyPNG, export as WebP)

**Why This Approach:**
- **Simplicity**: CMS users can upload images without technical knowledge
- **No build complexity**: Markdown images work immediately with standard syntax
- **Selective optimization**: Critical brand assets are optimized, content images are straightforward
- **Future-proof**: Can add Cloudflare Image Resizing or remark plugins later if needed

**Directory Structure:**
```
/src/assets/brand/          → Optimized logos (WebP, responsive)
/public/brand/favicon/      → Favicons (must be in public)
/public/media/              → CMS uploads (blog images, served as-is)
```

### TypeScript Path Aliases

Configured in `tsconfig.json`:

- `@components/*` maps to `./src/components/*`
- `@layouts/*` maps to `./src/layouts/*`

### SEO and Metadata

**Configuration:**
- Global site settings in `src/config/siteConfig.ts` (TypeScript wrapper) and `src/config/siteConfig.json` (editable via CMS)
- Site URL from config is used for sitemap generation and canonical URLs

**Components:**
- `BaseHead.astro` - Handles all SEO meta tags, Open Graph, Twitter Cards, and article schema
- `MainLayout.astro` - Base page layout that wraps content and delegates SEO props to BaseHead
- `Favicon.astro` - Manages favicon links (files in `public/brand/favicon/`)

**Page Frontmatter Pattern:**
Pages use a single exported `seoMeta` object for SEO metadata:

```astro
---
import MainLayout from "@layouts/MainLayout.astro";

// SEO metadata (passed to BaseHead via MainLayout)
export const seoMeta = {
	title: "Page Title",
	description: "Page description for SEO",
	canonical: "/page-url",
	type: "website", // or "article"
	noindex: false,
	author: "Author Name", // for articles
	pubDate: new Date(), // for articles
	image: "/path/to/image.jpg",
	imageAlt: "Image description",
};
---

<MainLayout {seoMeta}>
	<!-- Page content -->
</MainLayout>
```

**SEO Metadata Properties:**
- `title` - Page title (combined with site name in `<title>` tag)
- `description` - Meta description for SEO
- `canonical` - Canonical URL path (automatically converted to full URL)
- `image`, `imageAlt` - Open Graph and Twitter Card images
- `type` - Either `"website"` (default) or `"article"` for blog posts
- `noindex` - Set to true to prevent search engine indexing
- `author` - Author name for article schema (adds `author` and `article:author` meta tags)
- `pubDate` - Publication date for article schema (adds `article:published_time` meta tag)

**Image URL Encoding:**
- Image paths are automatically encoded segment-by-segment to handle spaces and special characters
- Example: `/media/Image from OpenGraph.png` → properly encoded for Open Graph tags

### Navigation Configuration

**Navigation is configured via a centralized JSON file** at `src/config/navConfig.json`:

**Structure:**
```json
{
  "navigation": [
    {
      "title": "Home",
      "path": "/"
    },
    {
      "title": "MoInsights",
      "path": "/moinsights",
      "description": "Optional suite description",
      "viewAllText": "View All Insights",
      "children": [
        {
          "title": "MoTrends",
          "path": "/moinsights/motrends",
          "description": "Optional product description"
        }
      ]
    }
  ]
}
```

**Properties:**
- `title` (required) - Display text for nav item
- `path` (required) - URL path
- `description` (optional) - Description text shown in dropdown
- `viewAllText` (optional) - Custom text for parent link in dropdown (defaults to "View All {title}")
- `children` (optional) - Array of child items (makes item a dropdown)

**Key Features:**
- **Hand-coded configuration** - Not managed by Pages CMS, edit directly in IDE
- **Hugo-style approach** - Items with `children` array automatically become dropdowns
- **Array-based ordering** - Position in array determines display order
- **Full config** - All display properties (title, path, description) defined in config
- **TypeScript types** - Validated types in `src/utils/navigation.ts`

**Dropdown Behavior:**
- **Desktop**: Click-to-toggle with arrow key navigation (↑↓ to navigate, Enter to select, Escape to close)
- **Auto-close**: Opening one dropdown automatically closes others (accordion-style)
- **Mobile**: Expanded sections showing all children inline
- **Parent links accessible**: First item in dropdown uses customizable `viewAllText` or defaults to "View All {title}"
- **WCAG Compliant**: Full keyboard navigation, ARIA labels, focus management

**Layout:**
- **Desktop**: 3-column grid layout (Logo | Navigation | Actions) for centered navigation
- **Mobile**: Flex layout (Logo | Buttons) with collapsible menu

**Navigation Utilities** (`src/utils/navigation.ts`):
- `getNavConfig()` - Load full navigation configuration
- `getNavItems()` - Get array of navigation items in order
- `isDropdown(item)` - Check if item has children

**Component** (`src/components/starwind/dropdown/Dropdown.astro`):
- Accessible dropdown with full keyboard support
- Starwind semantic colors
- Active state highlighting
- Descriptions shown for children (optional)

### Content Collections

Blog collection schema (`src/content/config.ts`):

- `title: string` (required)
- `pubDate: date` (required)
- `description: string` (optional)
- `featured_image: string` (optional)
- `author: string` (optional) - Simple author name string for SEO purposes
- `tags: string | string[]` (optional) - Comma-separated tags, automatically parsed to arrays

### Deployment

Configured for **Cloudflare Pages** with the adapter `@astrojs/cloudflare`:
- Uses `imageService: 'compile'` (compile-time image optimization, no runtime processing)
- Site URL configured via `siteConfig.url` in `astro.config.mjs`
- Output mode: `"server"` (SSR-capable, though currently pre-rendering all routes)

### Integrations

- `@astrojs/mdx` - MDX support for enhanced markdown
- `@astrojs/sitemap` - Automatic sitemap generation (uses `siteConfig.url` from config)
- `astro-icon` - Icon system using Iconify
  - **Icon Set**: Uses `@iconify-json/tabler` for all UI icons
  - **Usage**: Import with `import { Icon } from "astro-icon/components"`, then use `<Icon name="tabler:icon-name" />`
  - **Current Usage**: Navbar (sun/moon for theme toggle, menu icons)
- `@tailwindcss/vite` - Tailwind CSS v4 via Vite plugin (zero-config approach)
- `@tailwindcss/typography` - Typography plugin for styled prose content in blog posts
- `@tailwindplus/elements` - Additional Tailwind elements (imported in `MainLayout.astro`)

### Styling Approach

- **Tailwind CSS v4**: Uses zero-config approach with `@import "tailwindcss"` in `src/styles/global.css`
- **Starwind**: Component system built on Tailwind CSS for UI components
  - Configuration: `starwind.config.json` (base color: gray, CSS variables enabled)
  - Styles: `src/styles/starwind.css` (imported in `global.css`)
  - Component directory: `src/components/starwind/`
  - **IMPORTANT**: When building UI components, ALWAYS use Starwind's semantic color system (see below)
  - **Theme System**: Uses `.dark` class on `<html>` element for dark mode (not `dark:` variants at class level)
  - **Current Components**: Button (`src/components/starwind/button/`), Navbar (`src/components/Navbar.astro`)

**Starwind Semantic Colors:**
Use these semantic color classes that adapt to light/dark theme via CSS variables:
- `bg-background` - Page background
- `bg-card`, `text-card-foreground` - Card containers
- `bg-muted`, `text-muted-foreground` - Secondary/muted elements
- `text-foreground` - Primary text color
- `bg-primary`, `text-primary-foreground` - Primary brand color
- `bg-secondary`, `text-secondary-foreground` - Secondary brand color
- `bg-accent`, `text-accent-foreground` - Accent color
- Status colors: `bg-info`, `bg-success`, `bg-warning`, `bg-error` (with `-foreground` variants)
- `border`, `input`, `outline` - Border and input styling

**Dark Mode:**
- Theme is controlled via `.dark` class on `<html>` element
- Theme preference stored in localStorage as `"light"` or `"dark"`
- Theme script in `MainLayout.astro` prevents flash of unstyled content (FOUC)
- Toggle implemented in `Navbar.astro` with sun/moon icons (tabler:sun, tabler:moon)
- All color variables automatically adapt via CSS variable definitions in `starwind.css`
- **Best Practice**: Use Starwind semantic colors instead of `dark:` variants for automatic theme adaptation

**Other Features:**
- **No custom config file**: Relying on Tailwind v4's defaults (no `tailwind.config.js`)
- **Typography plugin**: For automatic styling of blog post content
- **Prettier**: Configured with `prettier-plugin-tailwindcss` for automatic class sorting
