import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes for deduplication.
 * @param  {...any} inputs - Class name strings or objects.
 * @returns {string} - The merged class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
} 