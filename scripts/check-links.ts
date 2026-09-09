// Every internal link in the built site has to resolve.
//
// Written after a real 404: the agent skill's Markdown links are relative
// (`references/patterns.md`), which is correct for the installed skill and wrong for
// the page that renders it — a browser at /docs/skill/overview resolved them to
// /docs/skill/overview/references/patterns.md. Nothing in the build noticed, because
// nothing was looking.
//
// Also checks that llms.txt keeps its promises. An index that points at pages which
// do not exist is worse than no index: a model cannot tell a missing page from a
// missing feature.
//
//   bun scripts/check-links.ts

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { listedPaths } from "../src/data/llms";

const DIST = resolve(import.meta.dir, "..", "dist");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** Where a site-absolute path lands in `dist`, or null when it lands nowhere. */
function resolveInDist(path: string): string | null {
  const clean = path.split("#")[0]!.split("?")[0]!;
  const relative = clean.replace(/^\//, "");
  const candidates =
    relative === ""
      ? ["index.html"]
      : [relative, join(relative, "index.html"), `${relative}.html`];
  for (const candidate of candidates) {
    const full = join(DIST, candidate);
    try {
      if (statSync(full).isFile()) return full;
    } catch {
      // Not this candidate; try the next shape.
    }
  }
  return null;
}

const problems: string[] = [];

// 1. Links in the built pages.
//
// Relative hrefs are checked too, and deliberately so: the 404 that prompted this
// was relative, and a checker that only looked at site-absolute links would have
// walked straight past it.
const HREF = /href="([^"]*)"/g;
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|$)/i;
const pages = walk(DIST).filter((file) => file.endsWith(".html"));
let checked = 0;

/** The URL a page is served at, so relative links can be resolved from it. */
function pageUrl(file: string): string {
  const path = file.slice(DIST.length);
  return path.endsWith("/index.html") ? path.slice(0, -"index.html".length) : path;
}

for (const page of pages) {
  const html = readFileSync(page, "utf-8");
  const from = pageUrl(page);
  const seen = new Set<string>();
  for (const match of html.matchAll(HREF)) {
    const href = match[1]!;
    if (EXTERNAL.test(href) || seen.has(href)) continue;
    seen.add(href);
    checked += 1;
    const target = href.startsWith("/")
      ? href
      : new URL(href, `https://x${from}`).pathname;
    if (!resolveInDist(target)) {
      problems.push(`${from} → ${href}${href.startsWith("/") ? "" : ` (resolves to ${target})`}`);
    }
  }
}

// 2. Everything llms.txt claims exists.
for (const path of listedPaths()) {
  checked += 1;
  if (!resolveInDist(path)) problems.push(`llms.txt → ${path}`);
}

if (problems.length > 0) {
  console.error(`link check FAILED — ${problems.length} dead internal link(s):\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  console.error("\nA link that 404s is indistinguishable from a missing feature.");
  process.exit(1);
}

console.log(
  `link check OK — ${checked} internal link(s) across ${pages.length} page(s) resolve.`,
);
