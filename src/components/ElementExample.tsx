import { AnimationPlayer } from "@kokoa/clotho/react";
import type { ElementGuide } from "@/data/element-guides";
import { useSiteTheme } from "@/components/useSiteTheme";

export function ElementExample({ guide }: { guide: ElementGuide }) {
  const theme = useSiteTheme();
  return <div className="element-example not-prose"><AnimationPlayer doc={guide.document} theme={theme} /></div>;
}
