export type Locale = "ko" | "en";
export type NavItem = readonly [href: string, ko: string, en: string];

export const navigation = [
  {
    ko: "시작",
    en: "Start",
    items: [
      ["/docs/getting-started", "시작하기", "Getting started"],
      ["/docs/react", "React에서 사용하기", "Using React"],
    ],
  },
  {
    ko: "핵심 안내서",
    en: "Guides",
    items: [
      ["/docs/features", "기능과 표현 요소", "Features and elements"],
      ["/docs/authoring-platform", "확장형 작성 환경", "Extensible authoring platform"],
      ["/docs/i18n", "Text 국제화", "Text localization"],
      ["/docs/api", "API와 hooks", "API and hooks"],
      ["/docs/schema", "JSON Schema", "JSON Schema"],
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
