/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Extend HTML attributes for Tailwind+ Elements custom attributes
declare namespace astroHTML.JSX {
	interface ButtonHTMLAttributes {
		command?: string;
		commandfor?: string;
	}
}
