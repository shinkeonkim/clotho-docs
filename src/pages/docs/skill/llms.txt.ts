import type { APIRoute } from "astro";

const BASE = "https://clotho-docs.shinkeonkim.com";
const REF = `${BASE}/skills/clotho-animation-authoring/references`;

/**
 * llms.txt for the authoring skill, scoped to `/docs/skill/`.
 *
 * The spec places a file at any path and says it covers the URLs beneath it, so
 * this one answers for the skill while the site-wide `/llms.txt` answers for
 * everything else. Links point at the raw markdown rather than the rendered
 * pages: the spec asks for clean markdown at matching URLs, and these files are
 * the skill's actual source — the pages are a rendering of them.
 */
const body = `# Clotho Animation Authoring Skill

> A skill for writing, revising and reviewing Clotho animation documents. Clotho renders a JSON document deterministically: every frame is computed from the document and an absolute millisecond time, never from earlier frames. The schema shipped with the package is the single source of truth — do not invent or negotiate a format version.

Read the overview first. Each reference below is a separate file covering one
area; load only the ones a task needs.

## Overview

- [SKILL.md](${BASE}/skills/clotho-animation-authoring/SKILL.md): the authoring workflow and the output contract. Start here.

## Reference

- [schema.md](${REF}/schema.md): every document, element, effect and asset field, with defaults. Read whenever creating or changing fields.
- [patterns.md](${REF}/patterns.md): iteration, emphasis, camera restraint, moving connectors, grouping and chapter layout.
- [chart.md](${REF}/chart.md): the \`charts\` authoring spec, the compiled id convention that makes chart parts addressable, reveal modes and scales.
- [style.md](${REF}/style.md): render presets (\`clean\`, \`sketch\`, \`mono\`), why the pass sits between the scene and the adapter, and why time is not in the jitter seed.
- [math.md](${REF}/math.md): the \`math\` element, the injected typesetter contract, and build-time baking.
- [tooling.md](${REF}/tooling.md): \`dev\`, \`diff\`, \`explain\`, \`sync\` and \`storyboard\` — the authoring loop that lives outside the editor.
- [embedding.md](${REF}/embedding.md): markdown/MDX, the custom element, deep links, scrollytelling and presenter mode.

## Optional

- [integration.md](${REF}/integration.md): storing documents through an application, MCP server or editor. Only needed when the document is persisted by a host.
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
