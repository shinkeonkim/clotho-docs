# CLI tools

The editor is the UI for making documents. These commands are for the loop where
the files in a git working tree are the truth — a browser cannot open an
arbitrary local directory, so this is a place the editor cannot fill.

```bash
clotho validate animations/ --strict   # schema and semantic checks
clotho migrate  animations/ --write    # legacy v3/v4 to v1
clotho dev      animations/            # live-reloading preview
clotho diff     before.json after.json # what changed, in the author's units
clotho explain  doc.json --at 3200     # why the frame looks like this
clotho sync     animations/            # refresh source-linked code
clotho storyboard doc.json --out sheet.png
clotho gif      doc.json out.gif --fps 12
```

## `clotho dev`

Lists a directory's documents and, when a file changes outside, redraws **while
holding the playback position**. Validation and lint results appear on the same
screen. It writes files the browser sends, so it binds to `127.0.0.1` — do not
expose it on an untrusted network.

## `clotho diff`

A JSON text diff cannot express a change to an animation: adding one element
moves hundreds of lines. This reports in the author's units, and when only an id
changed it **infers a rename rather than a delete plus an add**, saying so.

## `clotho explain`

Answers the question that actually comes up: why is this element not showing.
Visibility reasons come first, and it **does not stop at the first one** — an
element can be outside its appearance window *and* inside a hidden group.

## `clotho sync`

Refreshes `code.source` content from the real files. With
`clotho validate --strict` in CI, a PR that changes code without updating the
animation fails on its own.

## `clotho storyboard`

Contact sheet or one file per frame. Frames come from **chapters** by default,
because the author already divided the piece into steps. Too many frames are
thinned evenly — the end of an animation is usually where the point is, so
cropping the tail is the worst cut.
