import { clsx, type ClassValue } from 'clsx'

/**
 * Utility for combining class names
 * Supports conditional classes, arrays, and objects
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}