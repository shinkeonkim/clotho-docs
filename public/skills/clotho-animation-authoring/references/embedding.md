# Embedding a document

## Markdown and MDX

```js
import { remarkClotho } from "@kokoa/clotho/mdx";
```

Fenced ```clotho blocks are validated at build time (a failure fails the build)
and a poster-frame SVG is inlined, so **the picture is visible without
JavaScript**. `hydrateClothoEmbeds()` promotes each embed to a player as it
enters the viewport. It emits HTML rather than a framework component, so Astro,
Next, Docusaurus and Vitepress all take the same path.

## Custom element

```html
<script type="module">
  import { defineClothoPlayer } from "@kokoa/clotho/element";
  defineClothoPlayer();
</script>
<clotho-player src="/animations/knapsack.json" theme="dark" autoplay loop></clotho-player>
```

Renders into a shadow root and carries its stylesheet, so it does not collide
with host CSS. Theme tokens are CSS variables and cross the boundary.

## Deep links

```ts
import { bindUrlState, shareUrl } from "@kokoa/clotho/dom";
```

**Prefer the chapter (`c`) over the time (`t`).** Editing a document makes
`t=3200` drift; a chapter id keeps pointing at the moment the author named. The
URL is written only on deliberate actions, through `replaceState`.

## Scrollytelling

```ts
import { mountScrollPlayer } from "@kokoa/clotho/dom";
mountScrollPlayer(stage, doc, { pin: true, snapToChapters: true });
```

Swaps the clock for scroll position. Under `prefers-reduced-motion` it degrades
to per-chapter still frames — scroll hijacking is especially bad for readers with
vestibular disorders, and slowing it down does not fix that.

## Presenter mode

```ts
import { mountPresenter } from "@kokoa/clotho/dom";
```

Chapters are treated as spans: next **plays that span and stops** rather than
jumping to a timestamp, because the animation is part of the explanation. Notes
live in `chapters[].notes`; `subtitle` is the caption the audience reads and
cannot double as notes.
