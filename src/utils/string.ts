import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge Tailwind CSS class names and handle conditional classes.
 * @param inputs - Class name values to be merged.
 * @returns - A single string of merged class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
