import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

 export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
 }

// things you can click or type into: the cursor shows its lens over these, and
// clicking one never counts as "empty space" for the infinity gauntlet snap
export const INTERACTIVE = 'a, button, [role="button"], label, input, select, textarea, summary';
