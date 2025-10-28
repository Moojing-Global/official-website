/**
 * Author utilities
 * Provides functions to load and work with author data
 */

import authorsData from '../data/authors.json';

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  email?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

/**
 * Get all authors
 */
export function getAllAuthors(): Author[] {
  return authorsData.authors;
}

/**
 * Get author by ID
 */
export function getAuthorById(id: string): Author | undefined {
  return authorsData.authors.find(author => author.id === id);
}

/**
 * Get multiple authors by IDs
 */
export function getAuthorsByIds(ids: string[]): Author[] {
  return ids
    .map(id => getAuthorById(id))
    .filter((author): author is Author => author !== undefined);
}

/**
 * Format author names for display
 * Examples:
 * - Single: "John Doe"
 * - Two: "John Doe and Jane Smith"
 * - Multiple: "John Doe, Jane Smith, and Bob Johnson"
 */
export function formatAuthorNames(authors: Author[]): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return authors[0].name;
  if (authors.length === 2) return `${authors[0].name} and ${authors[1].name}`;
  
  const lastAuthor = authors[authors.length - 1];
  const otherAuthors = authors.slice(0, -1);
  return `${otherAuthors.map(a => a.name).join(', ')}, and ${lastAuthor.name}`;
}
