import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export type ThemePreference = "light" | "dark" | "system";

const storageKey = "theme";

/**
 * Inline <head> script that applies the stored theme before first paint, so
 * a dark-mode visitor never sees a light flash. Kept tiny and dependency-free;
 * its hash is allowed by the page's Content-Security-Policy.
 */
export const themeBootstrapScript = `(()=>{try{var t=localStorage.getItem("${storageKey}");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

function readPreference(): ThemePreference {
	try {
		const stored = localStorage.getItem(storageKey);
		return stored === "light" || stored === "dark" ? stored : "system";
	} catch {
		return "system";
	}
}

const systemDark = () => matchMedia("(prefers-color-scheme: dark)").matches;

function apply(preference: ThemePreference) {
	const dark =
		preference === "dark" || (preference === "system" && systemDark());
	document.documentElement.classList.toggle("dark", dark);
}

const listeners = new Set<() => void>();

function setPreference(preference: ThemePreference) {
	try {
		if (preference === "system") localStorage.removeItem(storageKey);
		else localStorage.setItem(storageKey, preference);
	} catch {
		// Storage can be unavailable (private mode); the choice still applies now.
	}
	apply(preference);
	for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	const media = matchMedia("(prefers-color-scheme: dark)");
	const onSystemChange = () => {
		if (readPreference() === "system") apply("system");
	};
	const onStorage = (event: StorageEvent) => {
		if (event.key !== storageKey) return;
		apply(readPreference());
		listener();
	};
	media.addEventListener("change", onSystemChange);
	window.addEventListener("storage", onStorage);
	return () => {
		listeners.delete(listener);
		media.removeEventListener("change", onSystemChange);
		window.removeEventListener("storage", onStorage);
	};
}

/** Server and first client render report "system"; the real value follows after hydration. */
export function useThemePreference() {
	return useSyncExternalStore(subscribe, readPreference, () => "system");
}

const options = [
	{ value: "light", Icon: Sun },
	{ value: "dark", Icon: Moon },
	{ value: "system", Icon: Monitor },
] as const;

export function ThemeToggle({
	label,
	optionLabels,
}: {
	label: string;
	optionLabels: Record<ThemePreference, string>;
}) {
	const current = useThemePreference();
	return (
		<fieldset className="flex items-center gap-0.5 rounded-lg border p-0.5">
			<legend className="sr-only">{label}</legend>
			{options.map(({ value, Icon }) => (
				<button
					key={value}
					type="button"
					aria-pressed={current === value}
					title={optionLabels[value]}
					onClick={() => setPreference(value)}
					className={cn(
						"grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
						current === value && "bg-muted text-foreground",
					)}
				>
					<Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
					<span className="sr-only">{optionLabels[value]}</span>
				</button>
			))}
		</fieldset>
	);
}
