import { type ClassValue, clsx } from "clsx";

/** Join class names. Callers avoid conflicting utilities instead of merging them. */
export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}
