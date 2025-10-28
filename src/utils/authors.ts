/**
 * Author utilities
 * Provides functions to load and work with author data
 */

import { getCollection, getEntry } from 'astro:content';

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  email?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

/**
 * Get all authors
 */
export async function getAllAuthors(): Promise<Author[]> {
  const authors = await getCollection('authors');
  return authors.map(author => ({
    id: author.id,
    ...author.data
  }));
}

/**
 * Get author by ID
 */
export async function getAuthorById(id: string): Promise<Author | undefined> {
  try {
    const author = await getEntry('authors', id);
    if (!author) return undefined;
    return {
      id: author.id,
      ...author.data
    };
  } catch {
    return undefined;
  }
}

/**
 * Get multiple authors by IDs (synchronous version for use in components)
 * Note: This is a cached/synchronous wrapper - only use after authors are loaded
 */
export function getAuthorsByIds(ids: string[]): Author[] {
  // This will be replaced by async version in pages
  return [];
}

/**
 * Get multiple authors by IDs (async version)
 */
export async function getAuthorsByIdsAsync(ids: string[]): Promise<Author[]> {
  const authors = await Promise.all(
    ids.map(id => getAuthorById(id))
  );
  return authors.filter((author): author is Author => author !== undefined);
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
