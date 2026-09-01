import { animationDocumentSchema, type AnimationDocument } from "@kokoa/clotho";
import { AnimationPlayer } from "@kokoa/clotho/react";
import { useSiteTheme } from "@/components/useSiteTheme";
import chapters from "@public/animations/documents/chapters.json";
import connectors from "@public/animations/documents/connectors.json";
import easing from "@public/animations/documents/easing.json";
import effects from "@public/animations/documents/effects.json";
import elements from "@public/animations/documents/elements.json";
import groups from "@public/animations/documents/groups.json";
import interpolation from "@public/animations/documents/interpolation.json";
import iteration from "@public/animations/documents/iteration.json";
import transitions from "@public/animations/documents/transitions.json";

const documents: AnimationDocument[] = [
  elements,
  transitions,
  easing,
  interpolation,
  iteration,
  effects,
  connectors,
  groups,
  chapters,
].map((value) => animationDocumentSchema.parse(value));

export function Gallery() {
  const theme = useSiteTheme();
  return (
    <div className="gallery-grid not-prose">
      {documents.map((document) => (
        <section key={document.id} className="gallery-card">
          <div className="gallery-card-heading">
            <div>
              <h2>{document.title}</h2>
              <p>{document.description}</p>
            </div>
            <a href={`/animations/documents/${document.id}.json`}>JSON 보기</a>
          </div>
          <AnimationPlayer doc={document} theme={theme} />
        </section>
      ))}
    </div>
  );
}
