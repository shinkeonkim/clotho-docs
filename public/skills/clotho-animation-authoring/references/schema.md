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
