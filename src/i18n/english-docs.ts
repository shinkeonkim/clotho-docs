export const englishDocs = {
  "getting-started": {
    title: "Getting started",
    description: "Install Clotho and render your first animation document.",
    body: `# Getting started

Clotho computes a scene from a JSON document and an absolute time, then renders that scene through the adapter your application needs.

## Install

\`\`\`bash
npm install @kokoa/clotho
\`\`\`

For React, install the peer dependencies too.

\`\`\`bash
npm install @kokoa/clotho react react-dom
\`\`\`

## Create a document

\`\`\`ts
import { animationDocumentSchema } from "@kokoa/clotho";

const document = animationDocumentSchema.parse({
  clothoVersion: 1,
  id: "hello-clotho",
  title: "Hello, Clotho",
  duration: 3000,
  elements: [],
});
\`\`\`

Validate unknown JSON with \`parseDocument\` before passing it to an adapter.

## Continue

- [Render with React](/en/docs/react)
- [Explore every element](/en/docs/features)
- [Read the JSON Schema guide](/en/docs/schema)`,
  },
  react: {
    title: "Using React",
    description: "Render a Clotho document with React components and hooks.",
    body: `# Using React

Import the stylesheet once near your application root, then pass a validated document to the player.

## AnimationPlayer

\`\`\`tsx
import { AnimationPlayer } from "@kokoa/clotho/react";
import "@kokoa/clotho/styles.css";

export function Demo({ document }) {
  return <AnimationPlayer doc={document} theme="auto" />;
}
\`\`\`

The player supplies playback, restart, fullscreen, speed, chapter, caption, and timeline controls. Use \`hideControls\` when the host provides its own controls.

## AnimationStage

\`AnimationStage\` renders one deterministic frame and has no clock of its own. Pass \`doc\`, \`time\`, optional scene \`options\`, \`className\`, and \`theme\`.

## Hooks

- \`usePlayer(doc, options)\` returns the controller and current state.
- \`useReducedMotion()\` follows the viewer's motion preference.
- \`useHostTheme()\` reports the host color scheme.
- \`useInView(ref, threshold?)\` reports viewport visibility.
- \`useFullscreen(ref)\` returns fullscreen state and a toggle function.`,
  },
  library: {
    title: "Code library",
    description: "Choose Clotho runtime, adapter, authoring, and QA APIs for application code.",
    body: `# Code library

Use \`@kokoa/clotho\` to validate a JSON document and compute its scene at any time. Use [Clotho Editor](/en/docs/editor) when you want a visual authoring interface.

## Package entry points

- \`@kokoa/clotho\`: schema, runtime, authoring, layout, data, stories, and lint
- \`@kokoa/clotho/react\` and \`@kokoa/clotho/vue\`: framework players and stages
- \`@kokoa/clotho/dom\`: vanilla DOM mounting and patching
- \`@kokoa/clotho/svg\` and \`@kokoa/clotho/node\`: SVG and GIF output
- \`@kokoa/clotho/testing\`: animation assertions and visual regression
- \`@kokoa/clotho/plugins\`: plugin contracts and pipelines

## Library and Editor responsibilities

The library owns document semantics, scene computation, and rendering. Editor is a hostable UI that writes the same JSON Schema. No conversion layer is required between an Editor export and a runtime player.`,
  },
  features: {
    title: "Features and elements",
    description:
      "Understand Clotho's elements, timeline features, assets, and output adapters.",
    body: `# Features and elements

The same document and time always produce the same scene. Use the pages below for complete option tables, live examples, and source JSON.

## Elements

### Shapes and content

- [Rectangle](/en/docs/elements/rect), [Circle](/en/docs/elements/circle), [Text](/en/docs/elements/text)
- [Image](/en/docs/elements/image), [Code](/en/docs/elements/code)

### Connections and free-form shapes

- [Line](/en/docs/elements/line), [Arrow](/en/docs/elements/arrow)
- [Path](/en/docs/elements/path), [Polygon](/en/docs/elements/polygon)

### Structure

- [Group](/en/docs/elements/group)

## Appearances and tracks

Appearances define visible time windows and entry or exit modes. Tracks change a property through absolute-time keyframes using numeric, color, automatic, or discrete interpolation.

## Effects and connectors

Use \`highlight\`, \`pulse\`, and \`flow\` for temporary emphasis. A line or arrow can use fixed coordinates or follow moving elements through IDs and anchors.

## Chapters, assets, and themes

Chapters drive captions and a list positioned on any side. Images refer to reusable inline, external, or host-resolved assets. Players support light, dark, reduced-motion, and off-screen playback behavior.

## Output adapters

Clotho provides React, Vue, DOM, SVG, Node.js, GIF, and CLI entry points.`,
  },
  "authoring-platform": {
    title: "Extensible authoring platform",
    description: "Connect authoring, validation, responsive rendering, and QA around one Clotho document.",
    body: `# Extensible authoring platform

Clotho keeps core scene semantics in the runtime and exposes host-specific policy, import, export, and additional validation through plugins. The complete workflow is: create a document or template, bind data, compile constraints and responsive variants, lint and visually verify it, then render the same result through any adapter.

## Plugins

Declare plugins with \`definePlugin\`, register them with \`createPluginRegistry\`, and execute \`parse → normalize → compile → validate\` through \`runPluginPipeline\`. \`exportWithPlugins\` collects export artifacts. Plugin execution is deterministic and traced; plugins extend host boundaries rather than replacing schema, geometry, timeline, or scene semantics.

## Layout, annotations, and templates

Constraint layout expresses alignment, spacing, pinning, and centering relationships between elements. Linked annotations connect tokens in explanatory text to element IDs. \`defineTemplate\` validates string, number, boolean, enum, array, and object parameters before producing a complete document.

## Checkpoints, data, and stories

Interactive checkpoints pause playback for choice, text, or number input. Element bindings read JSON Pointer values from document \`data\` and assign them only to supported properties. Branching stories connect complete Clotho documents through a \`StoryManifest\`, preserving independent rendering, caching, and export for every node.

## Responsive stages and large scenes

\`responsive.variants\` select canvas, element overrides, and chapter placement by container width while preserving playback time. \`compileSceneDependencyPlan\`, \`createPreparedSceneBuilder\`, and viewport culling reduce repeated work for large scenes without changing scene output.

## Lint and visual regression

\`lintDocument\` provides correctness, accessibility, and recommended presets. \`autofixDocument\` changes only unambiguous findings. The gallery visual baseline renders representative times at multiple widths; use \`bun run visual:check\` in CI and update the baseline only after visual review.

## Editor QA

The development plugin panel in Clotho Editor exposes data bindings, story graphs, responsive inspection, performance profiling, lint findings, autofix previews, and visual regression. Inspector state is not stored in the animation document.`,
  },
  editor: {
    title: "Getting started with Clotho Editor",
    description: "Create and inspect Clotho JSON through the hosted or embedded visual editor.",
    body: `# Getting started with Clotho Editor

Open the [hosted Editor](https://clotho-editor.shinkeonkim.com/) or embed \`@kokoa/clotho-editor\` in your application.

![Clotho Editor with an incident-response document](/images/editor/overview.png)

## Basic workflow

Start from the untitled draft, draw elements, edit properties, arrange chapters and tracks on the timeline, inspect the real player in a separate window, then save through the host repository or export JSON.

![Switching between real Gallery documents](/images/editor/gallery-workflow.gif)

## Continue

- [Tools and canvas](/en/docs/editor/tools)
- [Timeline and preview](/en/docs/editor/timeline)
- [Repository and host integration](/en/docs/editor/integration)
- [Extensions and QA](/en/docs/editor/qa)`,
  },
  "editor/tools": {
    title: "Tools and canvas",
    description: "Select, draw, connect, group, and edit elements on the canvas.",
    body: `# Tools and canvas

Select a tool first, then click for its default size or drag to define its bounds. Use V, R, O, L, A, T, I, B, and Y for select, rectangle, circle, line, arrow, text, image, path, and polygon. Tool shortcuts are ignored while typing.

Use Shift, Control, or Command click for multiple selection. Double-click text for inline editing. Lines and arrows retain side and corner anchors while their targets move.

![Editing corner anchors and connectors](/images/editor/connectors.png)`,
  },
  "editor/timeline": {
    title: "Timeline and preview",
    description: "Edit chapters, appearances, tracks, playback, and detached previews.",
    body: `# Timeline and preview

The timeline shows chapters, appearances, and property tracks against one clock. Drag its resize handle to change the workspace height.

![Chapters and element tracks](/images/editor/chapters.png)

The detached timeline opens the same component in a browser window and synchronizes state with the main editor. Real preview opens an \`AnimationPlayer\` without editing handles so you can verify controls, themes, chapters, captions, and fullscreen behavior.`,
  },
  "editor/integration": {
    title: "Repository and host integration",
    description: "Connect storage, imports, image uploads, and host branding.",
    body: `# Repository and host integration

\`AnimationRepository\` defines list, load, create, save, and delete operations. Hosts own authentication, revisions, conflicts, and error handling. The Cloudflare demo uses LocalStorage while oh-my-blog connects its animation API.

\`resolveImage\` may return a CDN URL, host key, or data URL. Images live once in the document asset registry and are reused by ID. JSON export removes unreferenced image assets.

Use \`editorTitle\` for host branding and \`initialId\` to open a repository document. Without an ID, Editor starts from a real untitled draft.`,
  },
  "editor/qa": {
    title: "Extensions and QA",
    description: "Use permissioned Editor plugins for authoring and release checks.",
    body: `# Extensions and QA

Development plugins provide template parameters, data bindings, story graphs, responsive inspection, scene profiling, lint and autofix, and visual regression. Hosts grant UI, document-read, and document-write permissions independently.

Before release, inspect light and dark themes, compare responsive widths, resolve lint and accessibility findings, verify visual baselines, export JSON, and validate it again with the core schema.`,
  },
  i18n: {
    title: "Text localization",
    description:
      "Store localized text in one Clotho document and select it through SceneOptions.",
    body: `# Text localization

A single Clotho JSON document can carry text for any number of languages. The existing \`content\` field is always the default copy, so old documents continue to render without conversion.

## Korean, English, Japanese, and Chinese

Declare the languages offered by the document at the top level. When \`locales\` is omitted, Clotho uses Korean and English by default.

\`\`\`json
{
  "clothoVersion": 1,
  "id": "localized-guide",
  "locales": ["ko", "en", "ja", "zh-CN"]
}
\`\`\`

## Per-element languages and translations

A text element inherits the document list. Add \`text.locales\` only when that element needs a different list. Locale tags are open-ended BCP 47 tags, so users may add \`fr\`, \`pt-BR\`, or any other language their application supports.

\`\`\`json
{
  "type": "text",
  "id": "greeting",
  "x": 360,
  "y": 135,
  "content": "안녕하세요",
  "locales": ["ko", "en", "ja", "zh-CN", "fr"],
  "translations": {
    "en": "Hello",
    "ja": "こんにちは",
    "zh-CN": "你好",
    "fr": "Bonjour"
  }
}
\`\`\`

## Select the active locale

Pass the locale chosen by your browser, account settings, or URL through \`SceneOptions.locale\`.

\`\`\`tsx
<AnimationPlayer doc={document} options={{ locale: userLocale }} />
\`\`\`

Clotho tries an exact match first, then a base-language match such as \`en-US\` to \`en\`, and finally \`content\`.`,
  },
  api: {
    title: "API and hooks",
    description:
      "Public entry points, runtime APIs, adapters, and editor hooks.",
    body: `# API and hooks

## Package entry points

| Import | Purpose |
| --- | --- |
| \`@kokoa/clotho\` | Schema, runtime, player, scene, and authoring helpers |
| \`@kokoa/clotho/react\` | React components and hooks |
| \`@kokoa/clotho/vue\` | Vue components and composables |
| \`@kokoa/clotho/dom\` | Vanilla DOM mounting and patching |
| \`@kokoa/clotho/svg\` | SVG string output |
| \`@kokoa/clotho/node\` | File loading and GIF export |
| \`@kokoa/clotho/gif\` | GIF-only entry point |

## Schema and loading

Use \`animationDocumentSchema\`, \`parseDocument\`, \`parseDocumentOrThrow\`, \`parseDocumentText\`, \`parseUnknown\`, \`createDocumentCache\`, and \`validateDocument\` to accept documents safely.

## Authoring helpers

\`defineAnimation\`, \`appear\`, \`track\`, \`repeatAppearances\`, \`stagger\`, and the \`effects\` helpers provide a typed alternative to writing raw JSON.

## Runtime and player

\`computeSnapshot\` calculates element state. \`buildScene\` produces adapter-neutral nodes. \`createPlayer\` exposes \`play\`, \`pause\`, \`toggle\`, \`seek\`, \`restart\`, \`setSpeed\`, \`setLoop\`, subscriptions, and cleanup.

## Adapter APIs

React and Vue provide \`AnimationPlayer\`, \`AnimationStage\`, and player bindings. DOM provides \`mountPlayer\`, \`mountStage\`, and \`patchScene\`. SVG and GIF adapters provide deterministic static output.

## Host hooks

\`SceneOptions\` accepts a locale, asset resolver and cache, code highlighter, text measurer, font families, and raw-color mode. The locale selects a text translation. Clotho Editor accepts an \`AnimationRepository\` and image resolver so each host can control loading, saving, deletion, and uploads.`,
  },
  schema: {
    title: "JSON Schema",
    description:
      "A human-readable reference for the complete Clotho document format.",
    body: `# JSON Schema

The machine-readable schema ships as \`@kokoa/clotho/schema.json\`. This guide explains the document structure used by people and tools.

## Top-level document

| Field | Type | Purpose |
| --- | --- | --- |
| \`clothoVersion\` | literal \`1\` | Schema identifier |
| \`id\` | ID | Stable document ID |
| \`title\`, \`description\` | string | Reader-facing metadata |
| \`duration\` | non-negative integer | Timeline length in milliseconds |
| \`locales\` | locale tag array | Document languages; defaults to Korean and English |
| \`canvas\` | object | Width, height, and background |
| \`assets\` | map | Reusable image sources |
| \`elements\` | array | Shapes and content in document order |
| \`chapters\`, \`effects\` | array | Narrative steps and temporary emphasis |
| \`settings\` | object | Playback and chapter UI intent |

## Common element fields

Every element has \`type\`, \`id\`, optional \`name\` and \`parentId\`, \`rotation\`, \`appearances\`, and \`tracks\`. Text also has optional \`locales\` and a \`translations\` map while \`content\` remains its default copy. See [Text localization](/en/docs/i18n) and each [element page](/en/docs/features) for complete fields and valid JSON.

## Appearance and PropertyTrack

An appearance contains \`start\`, \`end\`, entry and exit modes, and their durations. A track contains a property, interpolation mode, and ordered keyframes with absolute millisecond times.

## Assets and effects

Assets are \`inline\`, \`external\`, or \`ref\` records. Image elements point to them through \`assetId\`. Effects share \`id\`, \`elementId\`, and \`time\`, then add highlight, pulse, or flow options.

## Semantic validation

After schema parsing, run \`validateDocument\` to catch duplicate IDs, missing references, invalid parent trees, incomplete connector endpoints, out-of-range timeline values, and unsupported tracked properties.

\`\`\`bash
bunx clotho validate animation.json --strict
\`\`\``,
  },
  "ai-authoring": {
    title: "Authoring with AI",
    description: "Install and use the Clotho animation authoring skill.",
    body: `# Authoring Clotho animations with AI

The \`clotho-animation-authoring\` skill teaches an AI coding agent to plan the visual story first, use the installed Clotho schema as its source of truth, validate the complete document, and inspect representative frames.

## Install

\`\`\`bash
mkdir -p ~/.codex/skills
base=https://clotho-docs.shinkeonkim.com/skills/clotho-animation-authoring
target=~/.codex/skills/clotho-animation-authoring
curl -L "$base/SKILL.md" --create-dirs -o "$target/SKILL.md"
curl -L "$base/references/schema.md" --create-dirs -o "$target/references/schema.md"
curl -L "$base/references/patterns.md" --create-dirs -o "$target/references/patterns.md"
curl -L "$base/references/integration.md" --create-dirs -o "$target/references/integration.md"
\`\`\`

## Preview the skill

- [Workflow and output contract](/en/docs/skill/overview)
- [Schema reference](/en/docs/skill/schema)
- [Animation patterns](/en/docs/skill/patterns)
- [Editor and MCP integration](/en/docs/skill/integration)

## Prompt example

\`\`\`text
Use $clotho-animation-authoring to create an eight-second animation that explains
Bellman-Ford edge relaxation. Put the chapter list on the right and verify both themes.
\`\`\`

The final document should still be opened in Clotho Editor or a real \`AnimationPlayer\` for visual review.`,
  },
} as const;
