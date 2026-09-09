import { elementGuides, elementSlugs } from "@/data/element-guides";
import { elementEnglish } from "@/i18n/element-english";

// The index a model reads before deciding what to fetch.
//
// Every page on this site is written for a person: prose, a live player, a table of
// options. A model arriving at the root has no way to tell which of sixty pages
// answers its question, and no reason to guess right. llms.txt is the one file that
// says what is here and what each part is for.
//
// Descriptions are written for that decision — "read this when you need X" — rather
// than as summaries of the page. A summary tempts a model to answer from the index;
// a purpose tells it which document to open.

export interface LlmsEntry {
  readonly path: string;
  readonly title: string;
  readonly description: string;
}

export interface LlmsSection {
  readonly title: string;
  readonly note?: string;
  readonly entries: readonly LlmsEntry[];
}

export const summary =
  "Clotho is a JSON format and rendering library for explanatory animations. A document plus an absolute time computes a frame — no accumulated state — so React, Vue, DOM, SVG-string, and GIF output all agree about what is on screen at any moment.";

export const notes = [
  "The schema is the source of truth: `clothoVersion: 1`, IDs matching `^[a-z0-9][a-z0-9_-]*$`, integer milliseconds. Parse with `animationDocumentSchema` and check with `validateDocument` before treating a document as finished.",
  "For writing or revising a document, start with the skill sources under Agent skill: they are plain Markdown, written for this task, and shorter than the reference pages.",
];

export const sections: readonly LlmsSection[] = [
  {
    title: "Agent skill",
    note: "Raw Markdown, installable as an agent skill. These are the files to read when the task is to produce or revise a document.",
    entries: [
      {
        path: "/skills/clotho-animation-authoring/SKILL.md",
        title: "Clotho Animation Authoring",
        description:
          "The authoring workflow and output contract. Read first; it says which reference to open next.",
      },
      {
        path: "/skills/clotho-animation-authoring/references/schema.md",
        title: "Field reference",
        description:
          "Every document, element, appearance, track, camera, effect, and asset field with its defaults. Read whenever creating or changing a field.",
      },
      {
        path: "/skills/clotho-animation-authoring/references/patterns.md",
        title: "Authoring patterns",
        description:
          "Iteration, repeated visibility, effects, camera restraint, moving connectors, groups, chapters, theme-safe colour, and which frames to review.",
      },
      {
        path: "/skills/clotho-animation-authoring/references/integration.md",
        title: "Integration boundaries",
        description:
          "Validation commands, the editor's repository contract, and how to update a document through a revisioned or MCP store. Read only when storage is involved.",
      },
      {
        path: "/docs/ai-authoring",
        title: "Authoring with AI",
        description:
          "How to install the skill and what to hand a model along with a request.",
      },
    ],
  },
  {
    title: "Getting started",
    entries: [
      {
        path: "/docs/getting-started",
        title: "Getting started",
        description:
          "Install, write a first document, and render it. The shortest path from nothing to a playing animation.",
      },
      {
        path: "/docs/react",
        title: "Using React",
        description:
          "`AnimationPlayer`, `AnimationStage`, and the `usePlayer` hook for owning the clock yourself.",
      },
      {
        path: "/docs/vue",
        title: "Using Vue.js",
        description: "The Vue adapter's components and props.",
      },
      {
        path: "/docs/vanilla",
        title: "Using Vanilla JS",
        description:
          "`mountPlayer` and `mountStage` from the DOM adapter, with no framework.",
      },
    ],
  },
  {
    title: "The library",
    entries: [
      {
        path: "/docs/library",
        title: "Library overview",
        description:
          "What each entry point contains and which one a given host should import.",
      },
      {
        path: "/docs/features",
        title: "Features and elements",
        description:
          "The whole feature surface in one page: elements, appearances, tracks, effects, connectors, chapters, camera, assets, theming, and output. Start here when you do not know what exists.",
      },
      {
        path: "/docs/camera",
        title: "Camera",
        description:
          "Moving the viewport: `focus` names elements and lets the camera frame them, `tracks` write zoom/x/y directly. Also says when *not* to move the view — it is a dramatic device and easy to overuse.",
      },
      {
        path: "/docs/authoring-platform",
        title: "Extensible authoring platform",
        description:
          "Plugins, constraint layout, templates, data binding, checkpoints, branching stories, responsive stages, linting, and visual regression.",
      },
      {
        path: "/docs/api",
        title: "API and hooks",
        description:
          "Exported functions and hooks: scene building, snapshots, camera resolution, players, and host-injected renderers.",
      },
      {
        path: "/docs/schema",
        title: "JSON Schema",
        description:
          "The generated JSON Schema and how to validate a document against it outside JavaScript.",
      },
      {
        path: "/docs/i18n",
        title: "Text localization",
        description:
          "Per-document and per-element locales, translations, and fallback order for `text` content.",
      },
    ],
  },
  {
    title: "Elements",
    // English summaries: this file is read by a model, and the rest of it is
    // English. The pages themselves are Korean, which the Notes section says.
    note: "One page per element type, each with its own options table and a running example.",
    entries: elementSlugs.map((slug) => ({
      path: `/docs/elements/${slug}`,
      title: `${elementGuides[slug].title} (\`${slug}\`)`,
      description: elementEnglish[slug].summary,
    })),
  },
  {
    title: "Clotho Editor",
    entries: [
      {
        path: "/docs/editor",
        title: "Getting started with Editor",
        description:
          "The visual editor, hosted or embedded, and the basic authoring loop.",
      },
      {
        path: "/docs/editor/tools",
        title: "Tools and canvas",
        description:
          "Selecting, drawing, connecting, grouping, and editing on the canvas.",
      },
      {
        path: "/docs/editor/timeline",
        title: "Timeline and preview",
        description:
          "Chapters, appearance bars, keyframes, the camera row, and the real-player preview.",
      },
      {
        path: "/docs/editor/integration",
        title: "Repository and host integration",
        description:
          "The `AnimationRepository` contract a host implements to store documents.",
      },
      {
        path: "/docs/editor/qa",
        title: "Extensions and QA",
        description:
          "The development panel: bindings, story graphs, responsive inspection, profiling, lint, and visual regression.",
      },
    ],
  },
  {
    title: "Examples",
    entries: [
      {
        path: "/",
        title: "Gallery",
        description:
          "Running documents, one per concept, each with a link to its JSON. The fastest way to see what a feature looks like in a real document.",
      },
      {
        path: "/animations/documents/camera.json",
        title: "camera.json",
        description:
          "A complete document using `camera.focus`, including one focus that follows a moving element.",
      },
      {
        path: "/animations/documents/spotlight.json",
        title: "spotlight.json",
        description:
          "A dependency graph where colour already carries meaning, lit one part at a time — including a scattered path with `shape: \"elements\"`.",
      },
      {
        path: "/animations/documents/incident-walkthrough.json",
        title: "incident-walkthrough.json",
        description:
          "The largest example: data binding, constraint layout, annotations, checkpoints, and a responsive stage in one document.",
      },
    ],
  },
];

/** Every path this index promises, for the build-time existence check. */
export function listedPaths(): string[] {
  return sections.flatMap((section) =>
    section.entries.map((entry) => entry.path),
  );
}

export function renderLlmsTxt(): string {
  const lines: string[] = ["# Clotho", "", `> ${summary}`, ""];
  for (const note of notes) lines.push(note, "");
  for (const section of sections) {
    lines.push(`## ${section.title}`, "");
    if (section.note) lines.push(section.note, "");
    for (const entry of section.entries) {
      lines.push(`- [${entry.title}](${entry.path}): ${entry.description}`);
    }
    lines.push("");
  }
  lines.push(
    "## Notes",
    "",
    "- Korean is the primary language of this site. Every `/docs/...` page has an English counterpart at the same path under `/en`, except the element pages, which are at `/en/docs/elements/...`.",
    "- The skill sources are language-neutral English and are the same files the installable skill ships.",
    "",
  );
  return lines.join("\n");
}
