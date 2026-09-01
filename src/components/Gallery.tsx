import { animationDocumentSchema, type AnimationDocument } from "@kokoa/clotho";
import { AnimationPlayer, koreanStrings } from "@kokoa/clotho/react";
import { useSiteTheme } from "@/components/useSiteTheme";
import chapters from "@public/animations/documents/chapters.json";
import connectors from "@public/animations/documents/connectors.json";
import easing from "@public/animations/documents/easing.json";
import effects from "@public/animations/documents/effects.json";
import elements from "@public/animations/documents/elements.json";
import groups from "@public/animations/documents/groups.json";
import incidentWalkthrough from "@public/animations/documents/incident-walkthrough.json";
import interpolation from "@public/animations/documents/interpolation.json";
import iteration from "@public/animations/documents/iteration.json";
import transitions from "@public/animations/documents/transitions.json";

const documents: AnimationDocument[] = [
  incidentWalkthrough,
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

const koreanMetadata: Record<string, { title: string; description: string }> = {
  "incident-walkthrough": {
    title: "장애 대응 흐름",
    description: "하나의 문서에서 data binding, constraint, annotation, checkpoint와 반응형 stage가 함께 동작합니다.",
  },
  elements: { title: "열 가지 표현 요소", description: "Clotho가 그릴 수 있는 모든 요소를 한 화면에서 확인합니다." },
  transitions: { title: "등장과 퇴장", description: "여덟 가지 전환 방식이 함께 나타나고 사라집니다." },
  easing: { title: "Easing 곡선", description: "같은 이동에 서로 다른 easing을 적용해 속도 변화를 비교합니다." },
  interpolation: { title: "보간 방식", description: "숫자, 색상과 이산 값이 시간에 따라 계산되는 방식을 보여줍니다." },
  iteration: { title: "반복 pattern", description: "stagger와 반복 구간으로 순차적인 흐름을 구성합니다." },
  effects: { title: "강조 Effect", description: "highlight, pulse와 flow effect를 비교합니다." },
  connectors: { title: "Anchor와 화살표", description: "움직이는 hub를 추적하는 anchor와 모든 arrowhead를 보여줍니다." },
  groups: { title: "중첩 Group", description: "바깥 group의 transform이 모든 자식에게 적용됩니다." },
  chapters: { title: "Chapter와 Caption", description: "네 단계의 caption과 단계 목록이 재생 시간에 맞춰 바뀝니다." },
};

export function Gallery({ locale = "ko" }: { locale?: "ko" | "en" }) {
  const theme = useSiteTheme();
  return (
    <div className="gallery-grid not-prose">
      {documents.map((source) => {
        const metadata = locale === "ko" ? koreanMetadata[source.id] : undefined;
        const document = metadata ? { ...source, ...metadata } : source;
        return <section key={document.id} className="gallery-card">
          <div className="gallery-card-heading">
            <div>
              <h2>{document.title}</h2>
              <p>{document.description}</p>
            </div>
            <a href={`/animations/documents/${document.id}.json`}>{locale === "ko" ? "JSON 보기" : "View JSON"}</a>
          </div>
          <AnimationPlayer doc={document} theme={theme} strings={locale === "ko" ? koreanStrings : undefined} />
        </section>;
      })}
    </div>
  );
}
