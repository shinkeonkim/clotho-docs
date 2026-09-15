# Math elements

A `math` element places a TeX expression. It is the eleventh element type.

```json
{
  "type": "math",
  "id": "eq1",
  "x": 120,
  "y": 90,
  "tex": "x = \\frac{-b}{2a}",
  "fontSize": 22,
  "alt": "x equals minus b over two a"
}
```

Fields: `x`, `y`, `tex` are required. `display` (`block` | `inline`), `fontSize`
(18), `color` (`#18181b`), `textAnchor` (`start`), and optional `alt`.

## The typesetter is injected

A TeX engine is larger than the whole clotho core, so the host supplies one
through `mathRenderer`. **Without one, the TeX source is drawn as monospace text
and a diagnostic is reported** — the element never silently disappears.

The renderer receives `fontSize`, `color`, `display` and `textAnchor`. It must
apply `textAnchor` itself, because it is the only party that knows how wide its
own output is; the core never measures the subtree it gets back.

## Baking

`bakeMathElements(doc, baker)` turns each expression into ordinary `path`
elements at authoring time, so the result needs no runtime hook at all. It is
idempotent: glyphs from a previous bake are discarded first, so baking twice
produces the same document as baking once.

Always write `alt`. It is the only field that means anything to a reader who
cannot see the typeset result, and it ships as `role="img"` plus `aria-label`.
