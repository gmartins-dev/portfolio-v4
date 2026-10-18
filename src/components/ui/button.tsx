import { cn } from "@/lib/utils";

const base =
	"inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border bg-clip-padding px-4 text-sm font-medium whitespace-nowrap transition-colors select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

// Each variant sets its own border color, so no class in `base` competes
// with it and plain concatenation is enough (no tailwind-merge).
const variants = {
	// The site accent (DESIGN.md): the one primary action per view.
	brand: "border-transparent bg-brand text-brand-foreground hover:bg-brand/90",
	outline:
		"border-foreground/25 bg-background hover:bg-muted hover:text-foreground dark:border-foreground/30 dark:bg-input/30 dark:hover:bg-input/50",
} as const;

/**
 * Classes for a button-styled link (`<a className={buttonVariants(...)}>`).
 * `className` is for layout only (margins, print); it must not override the
 * padding, size or colors set here.
 */
export function buttonVariants({
	variant,
	className,
}: {
	variant: keyof typeof variants;
	className?: string;
}): string {
	return cn(base, variants[variant], className);
}
