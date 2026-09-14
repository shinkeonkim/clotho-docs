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
- [Render with Vue.js](/en/docs/vue)
- [Render with Vanilla JS](/en/docs/vanilla)
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
  vue: {
    title: "Using Vue.js",
    description: "Render Clotho players and deterministic stages in a Vue 3 application.",
    body: `# Using Vue.js

Install Vue 3 and import the stylesheet once from your application entry.

## Player component

\`\`\`vue
<script setup lang="ts">
import { AnimationPlayer } from "@kokoa/clotho/vue";
import { parseDocumentOrThrow } from "@kokoa/clotho";
import "@kokoa/clotho/styles.css";
import source from "./animation.json";

const document = parseDocumentOrThrow(source);
</script>

<template>
  <AnimationPlayer :doc="document" theme="auto" />
</template>
\`\`\`

The player includes playback, restart, speed, chapters, fullscreen, and timeline controls. Pass \`hide-controls\` when your host supplies them.

## Stage and composable

Use \`AnimationStage\` with a fixed \`time\` for thumbnails and editor previews. Use \`usePlayer(document)\` when building custom controls from the controller and its reactive state.`,
  },
  vanilla: {
    title: "Using Vanilla JS",
    description: "Mount a Clotho player into existing HTML without a framework.",
    body: `# Using Vanilla JS

Use the DOM adapter when your application does not use React or Vue.

## Mount a player

\`\`\`ts
import { parseDocumentOrThrow } from "@kokoa/clotho";
import { mountPlayer } from "@kokoa/clotho/dom";
import "@kokoa/clotho/styles.css";

const source = await fetch("/animations/example.json").then((response) =>
  response.json(),
);
const animationDocument = parseDocumentOrThrow(source);
const container = document.querySelector<HTMLElement>("#animation");

if (!container) throw new Error("Animation container was not found.");

const handle = mountPlayer(container, animationDocument, { theme: "auto" });
window.addEventListener("pagehide", () => handle.destroy(), { once: true });
\`\`\`

Use \`handle.player\` to play, pause, seek, restart, change speed, read state, and subscribe to changes. Use \`mountStage\` when you need one fixed SVG frame without player controls.`,
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
- [Image](/en/docs/elements/image), [Code](/en/docs/elements/code), [Math](/en/docs/elements/math)

### Connections and free-form shapes

- [Line](/en/docs/elements/line), [Arrow](/en/docs/elements/arrow)
- [Path](/en/docs/elements/path), [Polygon](/en/docs/elements/polygon)

### Structure

- [Group](/en/docs/elements/group)

## Appearances and tracks

Appearances define visible time windows and entry or exit modes. Tracks change a property through absolute-time keyframes using numeric, color, automatic, or discrete interpolation.

## Effects and connectors

Use \`highlight\`, \`pulse\`, and \`flow\` for temporary emphasis. A line or arrow can use fixed coordinates or follow moving elements through IDs and anchors.

### Spotlight

\`highlight\` replaces a target's fill, which costs the element its own colour — and in a document where colour carries meaning (visited, type, owner) the emphasis erases the information. \`spotlight\` does the opposite: the targets are left exactly as they are and a scrim is laid over the rest.

\`\`\`json
{
  "type": "spotlight",
  "id": "sp-1",
  "elementIds": ["node-a", "edge-ab"],
  "time": 2000,
  "duration": 1200,
  "dim": 0.72,
  "shape": "elements",
  "padding": 12
}
\`\`\`

It is the only effect whose targets are plural, because the other three decorate one element and this one decorates everything else.

\`shape\` is \`bbox\` (a rectangle holding all the targets, the default), \`circle\` (its circumcircle), or \`elements\` (the targets' own silhouettes). **Reach for \`elements\` when the targets are scattered**: a box that holds three corners also lights everything between them.

\`dim\` is the scrim's opacity and \`dimColor\` its colour, defaulting to a theme token that is near-black in both themes — dimming means darkening either way. \`lit\` and \`litColor\` add a wash over the lit area, like a gel on a real lamp; \`lit\` is 0 by default, so the targets keep their own colours unless asked.

A lit target that moves keeps its lit area under it, whether it moves by its own track, by a parent group, or through an entry transition. Several active spotlights share one scrim — separate scrims would darken the overlap twice, and one would dim the other's target.

### Motion trail

Movement is often the information — a cursor sweeping an array, a search visiting nodes, two pointers closing on each other — and a still frame loses all of it. \`trail\` leaves the path behind the element.

\`\`\`json
{
  "type": "trail",
  "id": "tr-1",
  "elementId": "cursor",
  "time": 0,
  "duration": 6000,
  "window": 1200,
  "samples": 12,
  "mode": "auto",
  "fade": true,
  "color": "#94a3b8",
  "width": 2
}
\`\`\`

It is derived, never accumulated. At time \`t\` the positions over \`[t - window, t]\` are re-evaluated from the document, so seeking backwards, exporting a still and rendering frame 900 first all give the same trail. A buffer appended to during playback would answer differently depending on how the viewer arrived.

\`mode\` is \`auto\` (the default), \`path\`, or \`dots\`. \`auto\` draws dots when the position track interpolates discretely, because joining the samples of a teleporting element would draw a route it never took. \`window\` sets the length and \`samples\` the resolution — raising \`samples\` does not make the tail longer.

Samples that land on the same place are merged into one piece. A sample rate measures time, not distance, so a slow or stalled element piles several samples on one spot, and translucent pieces stacked on one spot composite: eleven dots fading from 0.08 to 1 come out solid, and the fade is drawn but not seen. As a result an element that is not moving leaves no trail at all, and once it stops the tail fades out as the window passes over the stall.

The window reaches back no further than the moment the element — or any ancestor group — came on stage, and the trail draws beneath the element it follows.

## Chapters, assets, and themes

Chapters drive captions and a list positioned on any side. Images refer to reusable inline, external, or host-resolved assets. Players support light, dark, reduced-motion, and off-screen playback behavior.

## Camera

\`camera\` decides which part of the canvas is on screen. Write \`zoom\`, \`x\`, and \`y\` directly as \`tracks\`, or name elements in \`focus\` and let the camera work out the framing — resolved against live bounds, so it follows a moving target. See [Camera](/en/docs/camera).

## Output adapters

Clotho provides React, Vue, DOM, SVG, Node.js, GIF, and CLI entry points.`,
  },
  camera: {
    title: "Camera",
    description: "Move the viewport instead of the elements: pan, zoom, and frame named elements.",
    body: `# Camera

The camera decides **which part of the canvas the reader is looking at**. It moves the view, not the elements.

Before it existed, explaining a large graph left two options: draw the whole thing small enough that nothing is legible, or split the document and break the flow. \`camera\` lets one document show the whole picture, go in where it matters, and come back out.

The [gallery](/en#gallery) has a running example.

## When to use it, and when not to

The camera is **emphasis, not layout.** Moving the view is the strongest way to tell a reader "look here now", and that makes it dramatic. Like every strong device it stops working when used often, and what remains is motion sickness.

Reach for it when:

- The drawing is large enough that showing all of it leaves the labels unreadable.
- The explanation is about one part right now, and the rest can recede for a moment.
- The subject moves and has to be followed — hard to fake without \`focus\`.
- The move itself is part of the explanation: whole → part → whole.

Do not reach for it when:

- **It is standing in for layout.** A well-arranged drawing needs no camera. Fix the canvas size and the element positions before you move the view.
- **Every chapter gets one.** Once a camera move is the default scene transition it has stopped being emphasis.
- **One element needs attention.** \`highlight\`, \`pulse\` and the spotlight effect exist for that, and they keep the context on screen.
- **There is text to read.** Nobody reads while the view is moving.

As a sense of scale: three or four focus entries is usually the ceiling for one document. More than that usually means the canvas is too large, or one document is carrying two explanations. Leave the view still between moves — a reader takes in the content after arriving, not during.

And a document with a camera has **every move replaced by a cut under \`prefers-reduced-motion\`.** Do not put explanation in the travel; make the destination frame stand on its own.

## Two ways to write it

\`camera\` is a top-level field with \`tracks\`, \`focus\`, and \`strokeScaling\`. The two can be combined: **a focus entry that has already started wins**, and otherwise the tracks supply the value. A focus transition starts from wherever the tracks had the camera at that moment, so mixing them does not make the view jump.

### focus — name the elements

This is the usual choice. Instead of coordinates and a zoom level, you say **what to show**.

\`\`\`json
{
  "camera": {
    "focus": [
      { "time": 1200, "duration": 800, "elementIds": ["ingest"], "padding": 24 },
      { "time": 3200, "duration": 900, "elementIds": ["worker", "retry"], "padding": 22 }
    ]
  }
}
\`\`\`

| Field | Meaning |
| --- | --- |
| \`time\` | When the move starts, in ms |
| \`duration\` | How long the move takes. Defaults to 600; \`0\` is a cut |
| \`elementIds\` | What to frame. Several ids frame the region containing all of them |
| \`padding\` | Breathing room around the target, in canvas units. Defaults to 24 |
| \`maxZoom\` | Ceiling on the zoom. Defaults to 4 |
| \`ease\` | Easing for the move |

A focus is **resolved against live element bounds on every frame**, so it follows a target that moves.

A focus **holds until the next one or the end of the document.** To return to the whole canvas, add a focus that frames everything.

\`maxZoom\` keeps a focus on one small element from filling the stage with it.

### tracks — write the values

Use this when the camera movement is itself part of the explanation. It reuses the element keyframe model.

\`\`\`json
{
  "camera": {
    "tracks": [
      {
        "property": "zoom",
        "keyframes": [
          { "time": 0, "value": 1 },
          { "time": 2000, "value": 2.6, "ease": "easeInOut" }
        ]
      },
      { "property": "x", "keyframes": [{ "time": 0, "value": 400 }, { "time": 2000, "value": 140 }] },
      { "property": "y", "keyframes": [{ "time": 0, "value": 250 }, { "time": 2000, "value": 150 }] }
    ]
  }
}
\`\`\`

\`property\` is one of \`zoom\`, \`x\`, \`y\`, and camera values are always numbers. \`x\` and \`y\` are the canvas coordinates the **center of the view** sits at; \`zoom\` is the magnification. The default is the canvas center at \`zoom: 1\`.

Because the values are in canvas coordinates, a responsive variant changing the stage size does not change what the camera points at.

## strokeScaling — line weight under zoom

| Value | Behaviour |
| --- | --- |
| \`scale\` (default) | What an optical camera does: magnifying the drawing thickens its lines |
| \`fixed\` | Divides stroke widths by the zoom so line weight stays constant — better for dense diagrams |

\`fixed\` is applied to the scene as plain numbers rather than through \`vector-effect\`, so every adapter and the resvg-based GIF renderer agree.

## Reduced motion

A moving viewport is the single most reliable way to make a reader motion sick. So \`prefers-reduced-motion\` does not merely slow the camera down: interpolation is replaced by holding the previous value until the next keyframe, which turns every move into a cut.

Documents need to do nothing for this. The adapters handle it.

## Reading camera values in code

\`computeCamera(document, time)\` returns the visible rectangle together with the values that produced it.

\`\`\`ts
import { computeCamera } from "@kokoa/clotho";

// null for a document without a camera.
const view = computeCamera(document, 3200);
// view.x, view.y, view.width, view.height — the viewBox
// view.centerX, view.centerY, view.zoom   — the authored values
// view.issues                             — focus entries that could not resolve
\`\`\`

The same time always gives the same answer. That is why seeking, static export, GIF frames, and an editor's scrubbing all agree about what is on screen.

If \`elementIds\` names something not visible at that time, the camera holds its previous state and reports \`focus-unresolved\` in \`issues\` rather than jumping somewhere meaningless.

## Adapters and output

The camera leaves the core as a single \`Scene.viewBox\` string. \`Scene\` already carried that field, so **no adapter changed**: React, Vue, DOM, the SVG string renderer, and the GIF renderer all pass it through.`,
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
  chart: {
    title: "Chart",
    description:
      "An authoring-time spec that compiles to ordinary primitives with predictable ids.",
    body: `# Chart

\`charts\` is an **authoring-time spec**. \`compileCharts\` lowers it into ordinary v1 elements, and only the result stays in the document.

So **the runtime never learns about charts.** No twelfth element type appears in the four adapters, the GIF renderer, or the editor's element switch, and the render path pays nothing.

## The id convention is the real contract

A chart is not a new renderer. It is a **primitive generator with predictable ids**, and that is essentially the whole design.

\`\`\`
bench__plot                    frame
bench__grid-y__line-0          grid
bench__axis-x                  axis line
bench__axis-x__tick-2__label   tick label
bench__series-quick            a series (one path for line)
bench__series-quick__point-3   one bar
bench__legend__quick           legend entry
\`\`\`

That is why **no chart-specific emphasis syntax is needed.** The existing syntax reaches chart parts directly — \`pulse\` on a bar, \`spotlight\` on a series, \`camera.focus\` on an axis.

The separator is \`__\` rather than \`/\` because the id pattern is \`^[a-z0-9][a-z0-9_-]*$\`, and that rule carries 383 documents and the migration with it. Series names are slugified and \`__\` folds to \`_\`, so a generated name cannot forge a path separator.

## reveal

\`reveal\` is shorthand for **ordinary tracks and appearance windows** the compiler writes. After compiling, an author can overwrite them.

| mode | what it makes |
| --- | --- |
| \`none\` | nothing; a finished chart from the first frame |
| \`grow\` | a bar's \`height\` from 0 with \`y\` moving alongside (rects anchor top-left, so both are needed) |
| \`sweep\` | \`strokeDasharray\` plus \`strokeDashoffset\` the length of the path |
| \`series\` | pushes each series' \`appearances.start\` by \`stagger\` |

## Scales

Only \`linear\` and \`band\`, and no \`d3-scale\`. What is needed is about 200 lines of arithmetic; pulling in interpolators, time scales and colour spaces for that is not a trade worth making.

Tick steps come from the 1/2/5×10ⁿ family, and the boundaries are **geometric means** rather than arithmetic midpoints — choosing between 2 and 5 is a question of ratio, and this is what keeps a \`nice\` domain and its ticks from disagreeing.

**A bar chart's value axis starts at zero.** Bar length *is* the encoding, so a truncated axis lies with length.

Crowded x tick labels are **thinned out**, with a \`label-crowding\` finding. A crowded axis is harder to read than one that labels every other tick.

## Scope

This is for explanatory charts, not analysis. \`kind\` is \`bar\` and \`line\`, and that list stays short. Embedding an external chart library at runtime is not an option: they need Canvas or React, and they carry their own animation state, so \`(document, t) → frame\` would no longer hold.`,
  },
  style: {
    title: "Render style",
    description:
      "Presets that change how a document is drawn rather than what it draws.",
    body: `# Render style

\`style\` decides **how** something is drawn, not **what** is drawn.

The same document should suit a blog post, a lecture slide, and a paper figure. Duplicating the document and editing colours is not the answer.

\`\`\`json
{ "style": { "preset": "sketch", "seed": "bellman-ford", "roughness": 1.2 } }
\`\`\`

| preset | what it is |
| --- | --- |
| \`clean\` | the rendering so far. The default, and **byte-identical output** |
| \`sketch\` | deterministic jitter. \`rect\`, \`circle\` and \`polygon\` become wobbled \`path\`s; \`line\` moves only its endpoints |
| \`mono\` | luma greyscale, for print and papers |

## Where it lives is the design

It is a **pure Scene → Scene pass** after \`buildScene\` and before any adapter. That position buys three things.

- **The eleven element builders are untouched.** A preset is a rule about drawing, not about what a circle is.
- **All four adapters and the GIF renderer come along for free.**
- **Changing a node's kind is safe.** Preserve \`key\` and the DOM patcher and React reconciliation keep working; below that, nothing cares whether it used to be a rect.

## Determinism — time is not in the seed

Jitter must look random without being random. Baking a GIF twice must produce the same file, and a frame reached by seeking must equal one reached by playing.

The seed is \`hash(style.seed ?? doc.id, node.key, node.kind)\` and the PRNG is mulberry32.

**Time \`t\` is not part of the seed.** Putting it in is the easiest way to make a sketch look alive and the surest way to make the picture boil — every frame reshuffles every line. An element travelling across the stage carries its own jitter with it.

## What it leaves alone

- **\`text\` and \`image\`**: wobbling letters does not read as relaxed, it reads as unreadable.
- **\`path\`**: redrawing arbitrary path data would need a complete parser.
- **Spotlight scrims and masks**: a wobbled edge opens bright gaps around the stage.
- **\`var(--cloth-*)\` tokens under \`mono\`**: the page decides those values, and they are already monochrome in the sense that matters.

\`mono\` also greys arrowheads and **gives those markers new ids**. Marker ids are document-global with the colour baked in, so until now the same id meant the same content; the preset breaks that assumption, and two players with different styles on one page would otherwise share whichever marker loaded first.

Past a node-count threshold (400) \`sketch\` **degrades to \`clean\`**. In a drawing that dense, hand-drawn lines are noise rather than charm, and the path data doubles.`,
  },
  embedding: {
    title: "Embedding",
    description:
      "Markdown/MDX, a custom element, deep links, scrollytelling, and presenter mode.",
    body: `# Embedding

Putting the same document into a blog post, someone else's page, a scroll-driven article, and a presentation screen — without duplicating it.

## Markdown and MDX

\`\`\`js
import { remarkClotho } from "@kokoa/clotho/mdx";
const plugins = [remarkClotho()];
\`\`\`

At build time the document is **validated** (a failure fails the build) and a poster-frame SVG is inlined into the markup. **The picture is visible without JavaScript**, and the theme tokens survive, so dark mode follows.

\`\`\`ts
import { hydrateClothoEmbeds } from "@kokoa/clotho/mdx";
hydrateClothoEmbeds(); // promote to a player as each enters the viewport
\`\`\`

It emits **HTML** rather than a framework component, so Astro, Next (MDX), Docusaurus, Vitepress and plain markdown all take the same path.

## Custom element (no bundler)

\`\`\`html
<script type="module">
  import { defineClothoPlayer } from "@kokoa/clotho/element";
  defineClothoPlayer();
</script>

<clotho-player src="/animations/knapsack.json" theme="dark" autoplay loop></clotho-player>
\`\`\`

It renders into a shadow root and **carries its stylesheet with it**, so it does not collide with host CSS. Theme tokens are CSS variables and cross the boundary, so a host's palette override still works.

\`el.player\` exposes \`seek\`, \`play\` and \`setSpeed\`; \`clotho-ready\`, \`clotho-chapterchange\`, \`clotho-ended\` and \`clotho-error\` bubble up.

## Deep links

\`\`\`ts
import { bindUrlState, shareUrl } from "@kokoa/clotho/dom";
const unbind = bindUrlState(handle.player, doc);
shareUrl(handle.player, doc); // https://…/knapsack?c=swap
\`\`\`

**Prefer the chapter (\`c\`) over the time (\`t\`).** Edit the document and \`t=3200\` drifts; a chapter id keeps pointing at the moment the author named.

The URL is written only on **deliberate actions** — pause, seek, speed — never during playback, and through \`replaceState\`, so the back button does not fill with animation history.

## Scrollytelling

\`\`\`ts
import { mountScrollPlayer } from "@kokoa/clotho/dom";
mountScrollPlayer(stage, doc, { pin: true, snapToChapters: true });
\`\`\`

Most animations inside long articles go unwatched. Readers do not press play, and when they do the frames run at a speed unrelated to their reading. Autoplay creates the opposite problem.

This swaps the clock for scroll position. Because \`Player\` already lives outside any framework and \`seek(t)\` is pure, **rewinding is free** — scrolling up is a smaller number, not an undo.

Under \`prefers-reduced-motion\` it **degrades to a list of per-chapter still frames**. Scroll hijacking is especially bad for readers with vestibular disorders, and slowing it down does not fix that.

## Presenter mode

\`\`\`ts
import { mountPresenter } from "@kokoa/clotho/dom";
mountPresenter(document.body, doc);
\`\`\`

\`→\`/\`Space\` next section, \`←\` previous, \`P\` play/pause, \`N\` notes, \`B\` blackout, \`F\` fullscreen.

A document with chapters already has a slide deck's structure. What was missing was **a way to advance at speaking pace**.

Chapters are treated as **spans**: pressing next **plays that span and stops**, rather than jumping to the chapter's timestamp. The animation is part of the explanation, and skipping it leaves the audience with a result and no process.

Speaker notes live in \`chapters[].notes\`. \`subtitle\` is **the caption the audience reads** and cannot double as notes.`,
  },
  tooling: {
    title: "CLI tools",
    description:
      "The authoring loop an editor cannot fill: dev, diff, explain, sync, storyboard.",
    body: `# CLI tools

The UI for making documents is the [editor](/en/docs/editor). The tools here are for the loop where **the files in a git working tree are the truth**. A browser cannot open an arbitrary local directory, so this is a place the editor cannot fill.

## Watching while you edit — \`clotho dev\`

\`\`\`bash
clotho dev animations/            # http://127.0.0.1:4173
clotho dev animations/ --headless # watch and validate, no page
\`\`\`

It lists the directory's \`*.json\` and, when a file changes outside, redraws **while holding the playback position**. Validation and lint results appear on the same screen.

The server has an endpoint that writes what the browser sends to a file, so **it binds to \`127.0.0.1\` by default.** Do not expose it on an untrusted network.

## What changed — \`clotho diff\`

A JSON text diff cannot express a change to an animation document. Adding one element moves hundreds of lines, and keyframe arrays look rewritten wholesale.

\`\`\`bash
clotho diff before.json after.json
clotho diff a.json b.json --format md   # a table for a PR comment
\`\`\`

It reports in the author's units — an element moved, a track gained a keyframe, a chapter shifted. When only an id changed it **infers a rename rather than a delete plus an add**, and says that it is inferring.

It answers a different question from visual regression testing: that decides *whether something broke*, this explains *what changed* to a person.

## Why it looks like this — \`clotho explain\`

The question that actually comes up while authoring always has the same shape: **why is this element not showing.**

\`\`\`bash
clotho explain doc.json --at 3200 --element cursor
\`\`\`

Visibility reasons come first, because a missing element could have half a dozen causes and each is fixed differently. And it **does not stop at the first reason** — an element can be outside its appearance window *and* inside a hidden group, and fixing one leaves it invisible.

## Keeping code in step — \`clotho sync\`

\`\`\`bash
clotho sync animations/         # refresh content and hash
clotho sync animations/ --check # write nothing; exit 1 if stale
\`\`\`

With \`clotho validate --strict\` in CI, **a PR that changes code without updating the animation fails on its own.**

## For media that cannot play — \`clotho storyboard\`

\`\`\`bash
clotho storyboard doc.json --out sheet.png --per-row 3
\`\`\`

Frames are chosen from **chapters** by default — the author already divided the piece into steps, which beats any heuristic. When there are too many frames they are thinned evenly, because the end of an animation is usually where the point is, and cropping the tail is the worst cut.`,
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

Assets are \`inline\`, \`external\`, or \`ref\` records. Image elements point to them through \`assetId\`. Effects share \`id\`, \`elementId\`, and \`time\`, then add highlight, pulse, or flow options. \`spotlight\` takes \`elementIds\` instead, plus \`dim\`/\`dimColor\`, \`lit\`/\`litColor\`, \`shape\`, \`padding\`, and \`fadeIn\`.

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

## llms.txt

[\`/llms.txt\`](/llms.txt) is the index a model reads first: every document on this site with a line saying **when to read it**, rather than a summary of what it says. A summary tempts a model to answer from the index; a purpose tells it which document to open.

When handing Clotho to an agent without installing the skill, this one file is the shortest route.

\`\`\`text
Read https://clotho-docs.shinkeonkim.com/llms.txt first, then open what you need
and produce a Clotho JSON document.
\`\`\`

Every link it promises is checked against the built site, because a 404 is indistinguishable from a missing feature.

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

## Use the camera sparingly

Moving the view is the strongest emphasis available, which makes it dramatic — and a dramatic device used often stops being one. Use \`highlight\` or \`pulse\` to draw attention to a single element, and fix the canvas size and coordinates rather than moving the view to compensate for layout.

The final document should still be opened in Clotho Editor or a real \`AnimationPlayer\` for visual review.`,
  },
} as const;
