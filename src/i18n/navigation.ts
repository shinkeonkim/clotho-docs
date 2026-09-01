export type Locale = "ko" | "en";
export type NavItem = readonly [href: string, ko: string, en: string];

export const navigation = [
  {
    ko: "시작",
    en: "Start",
    items: [
      ["/docs/getting-started", "시작하기", "Getting started"],
      ["/docs/react", "React에서 사용하기", "Using React"],
      ["/docs/vue", "Vue.js에서 사용하기", "Using Vue.js"],
      ["/docs/vanilla", "Vanilla JS에서 사용하기", "Using Vanilla JS"],
    ],
  },
  {
    ko: "코드 라이브러리",
    en: "Code library",
    items: [
      ["/docs/library", "라이브러리 개요", "Library overview"],
      ["/docs/authoring-platform", "확장형 작성 환경", "Extensible authoring platform"],
      ["/docs/features", "기능과 표현 요소", "Features and elements"],
      ["/docs/api", "API와 hooks", "API and hooks"],
      ["/docs/schema", "JSON Schema", "JSON Schema"],
      ["/docs/i18n", "Text 국제화", "Text localization"],
    ],
  },
  {
    ko: "Clotho Editor",
    en: "Clotho Editor",
    items: [
      ["/docs/editor", "Editor 시작하기", "Getting started with Editor"],
      ["/docs/editor/tools", "도구와 Canvas", "Tools and canvas"],
      ["/docs/editor/timeline", "Timeline과 미리보기", "Timeline and preview"],
      ["/docs/editor/integration", "저장소와 Host 연동", "Repository and host integration"],
      ["/docs/editor/qa", "확장 기능과 QA", "Extensions and QA"],
    ],
  },
  {
    ko: "AI 작성",
    en: "AI authoring",
    items: [
      ["/docs/ai-authoring", "AI로 만들기", "Authoring with AI"],
    ],
  },
  {
    ko: "표현 요소",
    en: "Elements",
    items: [
      ["/docs/elements/rect", "Rectangle", "Rectangle"],
      ["/docs/elements/circle", "Circle", "Circle"],
      ["/docs/elements/line", "Line", "Line"],
      ["/docs/elements/arrow", "Arrow", "Arrow"],
      ["/docs/elements/text", "Text", "Text"],
      ["/docs/elements/image", "Image", "Image"],
      ["/docs/elements/path", "Path", "Path"],
      ["/docs/elements/polygon", "Polygon", "Polygon"],
      ["/docs/elements/group", "Group", "Group"],
      ["/docs/elements/code", "Code", "Code"],
    ],
  },
  {
    ko: "AI 작성 Skill",
    en: "AI authoring skill",
    items: [
      ["/docs/skill/overview", "Skill 안내", "Skill overview"],
      ["/docs/skill/schema", "Schema reference", "Schema reference"],
      ["/docs/skill/patterns", "작성 pattern", "Authoring patterns"],
      [
        "/docs/skill/integration",
        "Editor와 MCP 연동",
        "Editor and MCP integration",
      ],
    ],
  },
] satisfies readonly { ko: string; en: string; items: readonly NavItem[] }[];

export function localizedPath(path: string, locale: Locale): string {
  const base = path.replace(/^\/en(?=\/|$)/, "") || "/";
  return locale === "en" ? (base === "/" ? "/en" : `/en${base}`) : base;
}
