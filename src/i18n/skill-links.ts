import type { Locale } from "@/i18n/navigation";

// The skill is an installable artifact, so its Markdown links have to be relative:
// `references/patterns.md` must resolve when the file sits in an agent's skill
// directory, and it does — the raw copies under /skills/... are reachable at exactly
// that path.
//
// The same text is also rendered as a docs page, and there the relative link is
// wrong in a way that produced real 404s: from /docs/skill/overview a browser
// resolves `references/patterns.md` to /docs/skill/overview/references/patterns.md,
// which is nothing.
//
// Rewriting at render time keeps the source portable and the page correct. Doing it
// the other way round — absolute links in the Markdown — would break the skill for
// every agent that installs it.

/** Reference file name → the docs slug that renders it. */
const REFERENCE_SLUGS: Record<string, string> = {
  "schema.md": "schema",
  "patterns.md": "patterns",
  "chart.md": "chart",
  "style.md": "style",
  "math.md": "math",
  "tooling.md": "tooling",
  "embedding.md": "embedding",
  "integration.md": "integration",
  "SKILL.md": "overview",
};

const SKILL_LINK = /href="(?:\.\/)?(?:references\/)?([A-Za-z-]+\.md)"/g;

/** Point relative skill links at the rendered pages rather than at nothing. */
export function rewriteSkillLinks(html: string, locale: Locale): string {
  const base = locale === "en" ? "/en/docs/skill" : "/docs/skill";
  return html.replace(SKILL_LINK, (match, file: string) => {
    const slug = REFERENCE_SLUGS[file];
    return slug ? `href="${base}/${slug}"` : match;
  });
}
