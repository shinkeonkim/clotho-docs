// A TeX typesetter for build time.
//
// clotho ships no typesetter on purpose: a TeX engine is larger than its entire
// core, so `math` elements take one through a hook. This site is a host, and it
// supplies that hook here — at build time rather than at runtime, so no reader
// downloads MathJax to look at one page.
//
// `bakeMathElements` turns each expression into ordinary `path` elements, which is
// why the result needs no hook at all once built.

import { mathjax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const tex = new TeX({ packages: AllPackages });
// `fontCache: 'none'` emits an independent path per glyph. The default reuses
// glyphs through `<use>` references into a cache, and a `<use>` cannot survive the
// trip into a clotho document — there is nowhere for the cache to live.
const svg = new SVG({ fontCache: "none" });
const mjDoc = mathjax.document("", { InputJax: tex, OutputJax: svg });

/** MathJax lays out in 1000 units per em. */
const UNITS_PER_EM = 1000;

interface Affine {
  readonly sx: number;
  readonly sy: number;
  readonly tx: number;
  readonly ty: number;
}

const IDENTITY: Affine = { sx: 1, sy: 1, tx: 0, ty: 0 };

/** Only translate and scale appear in MathJax output — no rotation, no skew. */
function compose(outer: Affine, inner: Affine): Affine {
  return {
    sx: outer.sx * inner.sx,
    sy: outer.sy * inner.sy,
    tx: outer.sx * inner.tx + outer.tx,
    ty: outer.sy * inner.ty + outer.ty,
  };
}

function parseTransform(value: string | null): Affine {
  let out = IDENTITY;
  if (!value) return out;
  for (const match of value.matchAll(/(translate|scale)\(([^)]*)\)/g)) {
    const args = match[2]!.split(/[\s,]+/).filter(Boolean).map(Number);
    if (match[1] === "translate") {
      out = compose(out, { sx: 1, sy: 1, tx: args[0] ?? 0, ty: args[1] ?? 0 });
    } else {
      out = compose(out, { sx: args[0] ?? 1, sy: args[1] ?? args[0] ?? 1, tx: 0, ty: 0 });
    }
  }
  return out;
}

/**
 * Apply an affine to path data.
 *
 * MathJax emits only `M L H V Q T Z`, all absolute and all at most quadratic — no
 * arcs, no relative commands — so this handles exactly those and throws on anything
 * else rather than silently misplacing a glyph.
 *
 * `H` and `V` survive as themselves because the transform has no rotation; with one
 * they would each have to become an `L`.
 */
function transformPath(d: string, m: Affine): string {
  const x = (v: number) => m.sx * v + m.tx;
  const y = (v: number) => m.sy * v + m.ty;
  const round = (v: number) => Number(v.toFixed(3));
  const out: string[] = [];
  for (const token of d.matchAll(/([MLHVQTZmlhvqtz])([^MLHVQTZmlhvqtz]*)/g)) {
    const cmd = token[1]!;
    const nums = (token[2]!.match(/-?[\d.]+(?:e-?\d+)?/g) ?? []).map(Number);
    if (cmd === "Z" || cmd === "z") {
      out.push("Z");
      continue;
    }
    if (cmd !== cmd.toUpperCase()) {
      throw new Error(`relative path command "${cmd}" from MathJax is not handled`);
    }
    if (cmd === "H") {
      out.push(`H ${nums.map((n) => round(x(n))).join(" ")}`);
    } else if (cmd === "V") {
      out.push(`V ${nums.map((n) => round(y(n))).join(" ")}`);
    } else {
      const pairs: string[] = [];
      for (let i = 0; i < nums.length; i += 2) {
        pairs.push(`${round(x(nums[i]!))} ${round(y(nums[i + 1]!))}`);
      }
      out.push(`${cmd} ${pairs.join(" ")}`);
    }
  }
  return out.join(" ");
}

function rectToPath(node: unknown, m: Affine): string {
  const attr = (name: string) => Number(adaptor.getAttribute(node as never, name) ?? 0);
  const x0 = attr("x");
  const y0 = attr("y");
  const x1 = x0 + attr("width");
  const y1 = y0 + attr("height");
  const p = (px: number, py: number) =>
    `${Number((m.sx * px + m.tx).toFixed(3))} ${Number((m.sy * py + m.ty).toFixed(3))}`;
  return `M ${p(x0, y0)} L ${p(x1, y0)} L ${p(x1, y1)} L ${p(x0, y1)} Z`;
}

/**
 * A `MathBaker` for `bakeMathElements`.
 *
 * Returns null for anything MathJax refuses, which leaves the element unbaked and
 * still rendering its source — the same fallback a host with no typesetter gets.
 */
export function mathjaxBaker(element: {
  readonly tex: string;
  readonly fontSize: number;
  readonly display?: string;
  readonly color?: string;
}): { glyphs: { d: string; fill?: string }[]; bakedBy: string } | null {
  const source = element.tex?.trim();
  if (!source) return null;

  let root: unknown;
  try {
    root = mjDoc.convert(source, { display: element.display !== "inline" });
  } catch {
    return null;
  }

  // em units → the element's own coordinate space. The y-flip is MathJax's own
  // `scale(1,-1)` on the outermost group, which `parseTransform` picks up.
  const scale = element.fontSize / UNITS_PER_EM;
  const glyphs: { d: string; fill?: string }[] = [];

  const walk = (node: unknown, inherited: Affine): void => {
    const kind = adaptor.kind(node as never);
    const own = parseTransform(adaptor.getAttribute(node as never, "transform"));
    const here = compose(inherited, own);
    if (kind === "path") {
      const d = adaptor.getAttribute(node as never, "d");
      if (d) glyphs.push({ d: transformPath(d, here) });
    } else if (kind === "rect") {
      glyphs.push({ d: rectToPath(node, here) });
    }
    for (const child of adaptor.childNodes(node as never) ?? []) walk(child, here);
  };

  walk(root, { sx: scale, sy: scale, tx: 0, ty: 0 });
  if (glyphs.length === 0) return null;
  return { glyphs, bakedBy: "mathjax@3.2.2" };
}
