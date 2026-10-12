// Finds denied terms in text by comparing SHA-256 hashes of every lowercase
// word and two-word phrase against scripts/denylist.json. The hashes keep
// confidential names out of this public repository. Used by
// scripts/check-dist.mjs and src/content/content.test.ts.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const denied = new Set(
	JSON.parse(readFileSync(new URL("./denylist.json", import.meta.url), "utf8"))
		.sha256,
);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

/** Returns the denied words or phrases found in `text` (empty if clean). */
export function findDenied(text) {
	const words = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
	const candidates = [
		...words,
		...words.slice(1).map((word, index) => `${words[index]} ${word}`),
	];
	return [
		...new Set(candidates.filter((candidate) => denied.has(sha256(candidate)))),
	];
}
