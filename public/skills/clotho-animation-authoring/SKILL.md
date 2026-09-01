---
name: clotho-animation-authoring
description: Create, revise, validate, or review animation JSON and code-authored documents that follow the current Clotho schema. Use for educational visualizations, algorithm animations, timeline effects, connectors, chapters, assets, and application integrations.
---

# Clotho Animation Authoring

Create a document that follows Clotho's current schema and whose visual story remains understandable at any seek time. Clotho is deterministic: every frame is computed from the document and an absolute millisecond time, not from earlier frames. Treat the package schema as the single source of truth instead of inventing or negotiating a format version.

Begin with the story, not the shapes. List the states a reader must understand, assign those states to absolute times, and then choose the smallest set of elements that communicates each state. A technically valid document is not finished until its labels, movement, contrast, connectors, and chapter boundaries remain clear when the reader seeks to any point.

## Authoring workflow

1. Establish the intended audience, canvas, duration, theme behavior, and the states the animation must explain. Make reasonable defaults when they do not change the lesson.
2. Give every document, element, chapter, effect, and asset a stable lowercase ID. Reuse IDs for references; never refer to labels or array positions.
3. Model persistent change with property tracks, visibility windows with appearances, and short emphasis with effects. Use chapters only for meaningful narrative boundaries.
4. Prefer `fromId`/`toId` connectors with explicit anchors when endpoints should follow moving elements. Use coordinates only for fixed endpoints.
5. Keep images in the document-level `assets` map. Refer to them with `assetId`; do not put a raw `src` on an image element.
6. Parse the complete document with `animationDocumentSchema` and run `validateDocument`. Do not discard unknown or invalid fields merely to make validation pass; fix the intended representation.
7. Inspect the start, each chapter boundary, the middle of every transition, and the final frame. Check light and dark themes, reduced motion, labels, connector endpoints, and text contrast.

Read [references/schema.md](references/schema.md) whenever creating or changing fields. Read [references/patterns.md](references/patterns.md) for iteration, effects, moving connectors, grouping, or chapter layouts. Read [references/integration.md](references/integration.md) only when the document will be stored through an application, MCP server, or editor.

## Output contract

- Emit a complete document conforming to the current Clotho schema when asked for JSON.
- Preserve existing fields and references during revisions unless the requested change makes them obsolete.
- For a partial storage API, first merge the update into the full current document and validate that result. Arrays are commonly replacement values, not item patches.
- Do not invent a host URL, revision, authentication value, database operation, or deployment action. Return the document and validation result unless the user authorizes integration work.
- Use Korean prose and labels when the surrounding content is Korean. Keep established technical names and code identifiers in English.
