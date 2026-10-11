/**
 * True when no page route matched the URL. Every page is a child of the root
 * route, so a lone root match means "not found". This relies only on public
 * match data (the router's own not-found flag is private and changed between
 * versions).
 */
export function isNotFound(matches: readonly unknown[]) {
	return matches.length === 1;
}
