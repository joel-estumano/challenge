import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes usando clsx e twMerge.
 *
 * @param {...ClassValue[]} inputs - As classes a serem combinadas.
 * @returns {string} - A string de classes combinadas.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
