import { animationDocumentSchema } from "@kokoa/clotho";
import { AnimationPlayer } from "@kokoa/clotho/react";

const document = animationDocumentSchema.parse({
  clothoVersion: 1,
  id: "docs-quick-example",
  title: "첫 번째 Clotho 애니메이션",
  duration: 2400,
  canvas: { width: 720, height: 320, background: "transparent" },
  elements: [
    {
      id: "box",
      type: "rect",
      x: 80,
      y: 100,
      width: 160,
      height: 88,
      fill: "#6366f1",
      rx: 16,
      tracks: [{ property: "x", keyframes: [{ time: 0, value: 80 }, { time: 2000, value: 480 }] }],
    },
  ],
});

export function QuickExample() {
  return <AnimationPlayer doc={document} theme="auto" />;
}
