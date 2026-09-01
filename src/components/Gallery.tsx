import { animationDocumentSchema, type AnimationDocument } from "@kokoa/clotho";
import { AnimationPlayer } from "@kokoa/clotho/react";
import chapters from "../../public/animations/documents/chapters.json";
import connectors from "../../public/animations/documents/connectors.json";
import easing from "../../public/animations/documents/easing.json";
import effects from "../../public/animations/documents/effects.json";
import elements from "../../public/animations/documents/elements.json";
import groups from "../../public/animations/documents/groups.json";
import interpolation from "../../public/animations/documents/interpolation.json";
import iteration from "../../public/animations/documents/iteration.json";
import transitions from "../../public/animations/documents/transitions.json";

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
  return (
    <div className="not-prose grid gap-8">
      {documents.map((document) => (
        <section key={document.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <div>
              <h2 className="m-0 text-xl font-semibold">{document.title}</h2>
              <p className="mb-0 mt-1 text-slate-600 dark:text-slate-300">{document.description}</p>
            </div>
            <a className="text-sm font-medium text-indigo-600" href={`/animations/documents/${document.id}.json`}>JSON 보기</a>
          </div>
          <AnimationPlayer doc={document} theme="auto" />
        </section>
      ))}
    </div>
  );
}
