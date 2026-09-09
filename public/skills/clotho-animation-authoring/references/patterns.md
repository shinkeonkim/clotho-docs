# Authoring patterns

## Iteration

Represent the collection with stable elements, one cursor/highlight element, and text for state. Move the cursor with numeric tracks. Change per-item fill or opacity at visit times. Use chapters for algorithm phases, not for every loop iteration unless each iteration is the lesson.

Generate repeated structures in code with `stagger(items, interval, factory)` and validate the returned document through `defineAnimation`.

## Repeated visibility

Use multiple appearances or `repeatAppearances({ start, duration, interval, count, ... })`. Do not create duplicate elements solely to show the same object repeatedly.

## Effects

Use a track when a value must remain changed. Use `highlight`, `pulse`, or `flow` when the emphasis is temporary. Space overlapping effects so their intended ordering is visible.

## Camera

The camera moves the view rather than the elements: `focus` names elements and lets the camera work out the framing, `tracks` write `zoom`/`x`/`y` directly. A focus resolves against live bounds every frame, so it follows a target that moves.

**Treat it as emphasis, not layout, and use it sparingly.** Moving the view is the strongest way to say "look here now", which makes it dramatic — and a dramatic device used often stops being one, leaving only motion sickness. Three or four focus entries is usually the ceiling for a document.

Use a camera when the drawing is large enough that showing all of it leaves labels unreadable, when the subject moves and must be followed, or when the whole → part → whole movement is itself the explanation.

Do not use a camera to compensate for layout: fix the canvas size and element positions first. Do not move the view on every chapter — once it is the default scene transition it is no longer emphasis. To draw attention to one element, use `highlight`, `pulse`, or the spotlight effect instead; they keep the context on screen. Never move the view over text the reader is meant to read.

Leave the view still between moves, and make each destination frame stand on its own: `prefers-reduced-motion` replaces every camera move with a cut, so explanation carried by the travel is lost.

## Moving connectors

Use `fromId`, `toId`, `fromAnchor`, and `toAnchor`. Anchored connectors recalculate endpoints as shapes move. Pick explicit anchors when `auto` would switch sides during motion. Fix the start endpoint with coordinates and track only the destination only when that is the actual visual story.

## Groups

Create one `group` element and set each child's `parentId`. Child coordinates are relative to the group. Animate the group for shared movement or visibility; animate children for independent state. Avoid parent cycles and never use legacy `childIds`.

## Chapters and layout

Use a chapter when the explanation enters a new semantic state. Keep labels short and subtitles explanatory. Enable `showChapterList` only when there are chapters. Choose left/right for wide stages and top/bottom when horizontal space is constrained.

## Theme-safe color

Test authored colors against both player themes. Use transparent canvas when the host owns the surface. Do not assume a white page behind low-contrast text. For diagrams, keep status colors distinct by lightness as well as hue.

## Review frames

Render or inspect time 0, the final time, every chapter time, every appearance start/end midpoint, and every effect peak. Verify that text stays inside shapes, connector heads point at the intended boundary, grouped elements retain alignment, and no asset is unresolved.
