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

## Assets

- inline: `{ "kind": "inline", "mime": "image/png", "data": "raw-base64" }`
- external: `{ "kind": "external", "url": "https://..." }`
- ref: `{ "kind": "ref", "key": "host-key" }`

Inline data excludes the `data:<mime>;base64,` prefix. A ref asset requires a host `AssetResolver`.
