import { type Locale, localeStorageKey, localizedPath } from "./i18n";

const english: Locale = "en";
const portuguese: Locale = "pt-BR";

/**
 * First-visit language (docs/adr/012-first-visit-locale-detection.md).
 *
 * `localeRedirectScript` runs inline in <head>, before the body is painted.
 * It acts only on "/": the English home sends a visitor whose browser prefers
 * Portuguese (pt, pt-BR, pt-PT...) to "/pt-br". The first language in
 * `navigator.languages` that is Portuguese or English decides; anything else
 * stays in English. A language picked with the header toggle is stored under
 * `localeStorageKey` (src/components/site-header.tsx) and beats the browser
 * preference (`sessionStorage` is the fallback when `localStorage` is blocked). Direct links to any other page are never redirected, and the
 * query string and hash are kept. Its hash enters the page CSP like any other
 * inline script (src/csp.ts).
 */
export const localeRedirectScript = `(()=>{try{if(location.pathname!=="/")return;let saved=null;try{saved=localStorage.getItem(${JSON.stringify(localeStorageKey)})}catch{}if(!saved)try{saved=sessionStorage.getItem(${JSON.stringify(localeStorageKey)})}catch{}if(saved===${JSON.stringify(english)})return;let pt=saved===${JSON.stringify(portuguese)};if(!pt){const tags=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language];for(const tag of tags){const lang=String(tag).toLowerCase();if(lang==="pt"||lang.startsWith("pt-")){pt=true;break}if(lang==="en"||lang.startsWith("en-"))break}}if(pt)location.replace(${JSON.stringify(localizedPath(portuguese, "/"))}+location.search+location.hash)}catch{}})();`;
