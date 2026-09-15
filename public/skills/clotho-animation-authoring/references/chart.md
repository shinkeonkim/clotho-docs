# Charts

`charts` is an authoring-time spec that `compileCharts` lowers into ordinary v1
elements. The runtime never learns that charts exist: no twelfth element type
appears in the adapters, the GIF renderer, or the editor, and the render path
costs nothing.

```json
{
  "charts": [{
    "id": "bench", "x": 60, "y": 40, "width": 520, "height": 300,
    "kind": "bar",
    "data": [{ "name": "naive", "ms": 120 }, { "name": "memo", "ms": 45 }],
    "encode": { "x": "name", "y": "ms", "series": "impl" },
    "scale": { "y": { "type": "linear", "domain": [0, "auto"], "nice": true } },
    "axes": { "x": { "label": "impl" }, "y": { "label": "ms", "grid": true } },
    "reveal": { "mode": "grow", "start": 500, "duration": 2500, "stagger": 120 },
    "legend": true
  }]
}
```

## The id convention is the contract

Compiled output has stable, predictable ids. This is the whole design: it means
**no chart-specific emphasis syntax is needed**, because the existing syntax
already addresses any part of a chart.

```
bench__plot                    frame
bench__grid-y__line-0          grid
bench__axis-x                  axis line
bench__axis-x__tick-2__label   tick label
bench__series-quick            a series (one path for line)
bench__series-quick__point-3   one bar
bench__legend__quick           legend entry
```

```json
{ "type": "pulse", "elementId": "bench__series-quick__point-3", "time": 4000 }
{ "type": "spotlight", "elementIds": ["bench__series-quick"], "time": 5000 }
```

The separator is `__` and not `/` because the id pattern is
`^[a-z0-9][a-z0-9_-]*$`. Series names are slugified and `__` folds to `_`, so a
generated name cannot forge a path separator.

## Fields

- `id`, `x`, `y`, positive `width`, positive `height`, `kind` (`bar` | `line`)
- `data`: rows as objects. Strings, numbers, booleans and null only.
- `encode`: `x` and `y` are required field names; `series` is optional and names
  the field whose value splits the rows into series.
- `scale`: optional `x`/`y`. `linear` takes `domain` and `nice`; `band` takes
  `padding`.
- `axes`: `x`/`y` with `label`, `ticks`, `grid`, `hidden`.
- `reveal`: `mode` (`none` | `grow` | `sweep` | `series`), `start`, `duration`,
  `stagger`, optional `ease`.
- `palette`, `legend`, optional `appearance`.

## Rules worth knowing

- **A bar chart's value axis starts at zero.** Bar length is the encoding, so a
  truncated axis lies with length.
- Only `linear` and `band` scales exist, and there is no `d3-scale` dependency.
- Crowded x tick labels are thinned, with a `label-crowding` finding.
- `kind` is `bar` and `line` only. This is for explanatory charts, not analysis.
