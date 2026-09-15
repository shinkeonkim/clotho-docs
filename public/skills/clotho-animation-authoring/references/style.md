# Render style

`style` decides **how** a document is drawn, not **what** it draws, so the same
document can suit a blog post, a lecture slide and a paper figure without being
duplicated.

```json
{ "style": { "preset": "sketch", "seed": "bellman-ford", "roughness": 1.2 } }
```

| preset | what it does |
| --- | --- |
| `clean` | the default; **output is byte-identical** to having no style at all |
| `sketch` | deterministic jitter; `rect`/`circle`/`polygon` become wobbled paths |
| `mono` | luma greyscale, for print |

## Why it lives between the scene and the adapter

It is a pure Scene to Scene pass after `buildScene`. That position means the
eleven element builders are untouched, all four adapters and the GIF renderer
inherit it for free, and changing a node's kind is safe as long as `key` is
preserved.

## Determinism

The seed is `hash(style.seed ?? doc.id, node.key, node.kind)`.

**Time is not part of the seed.** Including it is the easiest way to make a
sketch look alive and the surest way to make the drawing boil, because every
frame would reshuffle every line.

## What it leaves alone

`text` and `image` (wobbled letters stop being readable), `path` (redrawing
arbitrary path data needs a full parser), spotlight scrims and masks (a wobbled
edge opens bright gaps), and `var(--cloth-*)` tokens under `mono`.

Past 400 nodes, `sketch` degrades to `clean`: in a drawing that dense, hand-drawn
lines are noise, and the path data doubles.
