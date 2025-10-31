/**
 * Navigation utility for extracting and sorting navigation links from pages
 */

export interface NavMeta {
	title: string;
	menuOrder: number;
}

export interface NavLink {
	title: string;
	href: string;
	menuOrder: number;
}

/**
 * Get all navigation links from pages with navMeta exports
 * @param currentPath - The current page path for active state detection
 * @returns Sorted array of navigation links
 */
export async function getNavLinks(): Promise<NavLink[]> {
	// Import all page modules from src/pages
	const pages = import.meta.glob<{ navMeta?: NavMeta }>("/src/pages/**/*.astro", {
		eager: true,
	});

	const navLinks: NavLink[] = [];

	for (const [path, module] of Object.entries(pages)) {
		// Skip if no navMeta export
		if (!module.navMeta) continue;

		// Convert file path to URL path
		let href = path
			.replace("/src/pages", "")
			.replace(/\.astro$/, "")
			.replace(/\/index$/, "");

		// Handle root index
		if (href === "/index" || href === "") {
			href = "/";
		}

		// Skip dynamic routes (contain brackets)
		if (href.includes("[")) continue;

		navLinks.push({
			title: module.navMeta.title,
			href,
			menuOrder: module.navMeta.menuOrder,
		});
	}

	// Sort by menuOrder
	return navLinks.sort((a, b) => a.menuOrder - b.menuOrder);
}
