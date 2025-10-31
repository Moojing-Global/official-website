/**
 * Navigation utility for loading and validating navConfig
 */

import navConfigData from "../config/navConfig.json";

export interface NavChild {
	title: string;
	path: string;
	description?: string;
}

export interface NavItem {
	title: string;
	path: string;
	description?: string;
	viewAllText?: string;
	children?: NavChild[];
}

export interface ActionButton {
	label: string;
	path: string;
	variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "info" | "success" | "warning" | "error";
	icon?: string;
}

export interface NavConfig {
	navigation: NavItem[];
	actionButtons?: ActionButton[];
}

/**
 * Load navigation configuration from navConfig.json
 * @returns Navigation configuration object
 */
export function getNavConfig(): NavConfig {
	return navConfigData as NavConfig;
}

/**
 * Get all navigation items
 * @returns Array of navigation items in order
 */
export function getNavItems(): NavItem[] {
	const config = getNavConfig();
	return config.navigation;
}

/**
 * Get action buttons configuration
 * @returns Array of action buttons (max 3)
 */
export function getActionButtons(): ActionButton[] {
	const config = getNavConfig();
	const buttons = config.actionButtons || [];
	// Limit to 3 buttons for UI consistency
	return buttons.slice(0, 3);
}

/**
 * Check if a nav item has children (is a dropdown)
 * @param item - Navigation item to check
 * @returns True if item has children
 */
export function isDropdown(item: NavItem): boolean {
	return Array.isArray(item.children) && item.children.length > 0;
}
