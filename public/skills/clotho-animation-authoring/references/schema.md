# Clotho v1 field reference

Use `clothoVersion: 1`. IDs match `^[a-z0-9][a-z0-9_-]*$`. Time values are non-negative integer milliseconds.

## Document

Required identity: `clothoVersion`, `id`. Defaults exist for `title`, `description`, `category`, `tags`, `duration`, `canvas`, `assets`, `elements`, `chapters`, `effects`, and `settings`, but include values that communicate author intent.

```json
{
  "clothoVersion": 1,
  "id": "example",
  "title": "Example",
  "description": "",
  "category": "general",
  "tags": [],
  "duration": 5000,
  "canvas": { "width": 800, "height": 500, "background": "transparent" },
  "assets": {},
  "elements": [],
  "chapters": [],
  "effects": [],
  "settings": {
    "loop": true,
    "autoplay": true,
    "showCaption": false,
    "showChapterList": false,
    "chapterListPosition": "right"
  }
}
```

Chapter list positions: `left`, `right`, `top`, `bottom`.

## Common element fields

Every element has `type`, `id`, optional `name` and `parentId`, `rotation` (default 0), `appearances` (default `[]`), and `tracks` (default `[]`).

- `rect`: `x`, `y`, positive `width`, positive `height`; fill/stroke, `cornerRadius`, optional `label` and `subtitle`.
- `circle`: `cx`, `cy`, positive `r`; fill/stroke and optional `label`.
- `line`: coordinate or element endpoints; stroke and optional heads.
- `arrow`: line fields plus optional `label`, label offsets, and `curvature`.
- `text`: `x`, `y`, `content`; font size/weight, color, `textAnchor`.
- `image`: `x`, `y`, positive size, `assetId`; optional `alt`, aspect ratio, opacity.
- `path`: SVG `d`; optional offset, fill/stroke, opacity.
- `polygon`: SVG `points`; fill/stroke, opacity.
- `group`: `x`, `y`; children point to its ID through `parentId`.
- `code`: position, positive size, `content`; language, line numbers, palette, padding, title.
- `math`: `x`, `y`, `tex`; `display`, `fontSize`, `color`, `textAnchor`, optional `alt`. The typesetter is injected by the host through `mathRenderer` — without one the TeX source is drawn as monospace and a diagnostic is reported, so the frame still says what the author meant.

## Document fields added in 0.5.0

- `charts`: authoring-time chart specs. See [chart.md](chart.md).
- `style`: render preset. See [style.md](style.md).
- `chapters[].notes`: speaker notes, shown only in presenter mode. `subtitle` is the caption the audience reads and cannot double as notes.
- `code.source`: `{ file, region? | lines?, hash? }` recording where `content` came from. `region` survives lines being added above it; `lines` silently drifts. The runtime never reads the file — `content` is always the truth.
- `math`: the eleventh element type. See [math.md](math.md).

Connector anchors: `auto`, `top`, `right`, `bottom`, `left`, `center`, `top-left`, `top-right`, `bottom-left`, `bottom-right`.

Arrow heads: `none`, `arrow`, `triangle`, `triangle-open`, `circle`, `circle-open`, `diamond`, `diamond-open`, `bar`.

## Appearance and tracks

Appearance fields: `start`, `end`, optional `entryMode`/`exitMode`, `entryDuration`, `exitDuration`. Modes: `instant`, `fade`, four directional slides, `zoom`, `pop`.

Property track fields: `property`, optional `interpolate`, non-empty `keyframes`. Interpolation: `auto`, `number`, `color`, `discrete`. Keyframe fields: `time`, string/number/boolean `value`, optional ease. Ease: `linear`, `easeIn`, `easeOut`, `easeInOut`.

## Camera

Optional top-level `camera` with `tracks`, `focus`, and `strokeScaling`. Omit the field entirely for a document that does not move the view.

- track: `property` (`zoom`, `x`, `y`), non-empty `keyframes` of `{ time, value, ease? }`. Values are always numeric; `x`/`y` are the canvas coordinates of the view centre and default to the canvas centre at `zoom: 1`.
- focus: `time`, `duration` (default 600; `0` is a cut), non-empty `elementIds`, `padding` (default 24), `maxZoom` (default 4), optional `ease`. Resolved against live element bounds each frame.
- `strokeScaling`: `scale` (default; lines thicken with zoom) or `fixed` (constant line weight).

A focus that has started wins over the tracks, and it transitions from wherever the tracks had the camera. A focus holds until the next one or the end of the document. A focus naming an element that is not visible at that time holds the previous view and reports `focus-unresolved`.

Read `references/patterns.md` before adding a camera: it is emphasis, not layout, and is easy to overuse.

## Effects

All effects have `type`, `id`, `elementId`, `time`.

- `highlight`: `color`, `duration`
- `pulse`: positive `scale`, `duration`
- `flow`: `color`, `particles` (1–10), positive `radius`, `duration`; use on a connector

`spotlight` is the exception: it takes `elementIds` (non-empty) rather than `elementId`, because it decorates everything *except* its targets.

- `duration` (default 1200), `fadeIn` (default 200, applied at both ends)
- `dim` 0–1 (default 0.7) and optional `dimColor` — opacity and colour of the scrim over everything else. `dimColor` defaults to a theme token that is near-black in both themes.
- `lit` 0–1 (default 0) and `litColor` (default `#fde68a`) — a wash over the lit area. Zero by default, so targets keep their own colours.
- `shape`: `bbox` (default), `circle`, `elements`
- `padding` (default 12) — lit area kept around the targets

`trail` takes a single `elementId` and leaves the path the element has travelled.

- `window` (default 1200) — how far back the tail reaches, in milliseconds
- `samples` (default 12, 2–32) — how many past instants are evaluated. This is resolution, not length; raising it does not lengthen the tail.
- `mode`: `auto` (default), `path`, `dots`. `auto` draws dots when the element's position track interpolates discretely.
- `fade` (default true), `color` (default `#94a3b8`), positive `width` (default 2), `duration` (default 3000)

The trail is re-derived from the document at every frame rather than accumulated, so it survives seeking and still-frame export. Samples that land on the same place are merged, which means an element that is not moving leaves no trail, and one that stops has its tail fade out as the window passes.

## Assets

- inline: `{ "kind": "inline", "mime": "image/png", "data": "raw-base64" }`
- external: `{ "kind": "external", "url": "https://..." }` — an ordinary https URL. Prefer this over inline base64 when the image is already hosted; it keeps the document small. The URL must be reachable wherever the document is rendered, including static SVG export and GIF baking.
- ref: `{ "kind": "ref", "key": "host-key" }`

Inline data excludes the `data:<mime>;base64,` prefix. A ref asset requires a host `AssetResolver`.
