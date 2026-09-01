import { useState } from "react";
import { animationDocumentSchema } from "@kokoa/clotho";
import { AnimationPlayer } from "@kokoa/clotho/react";
import { useSiteTheme } from "@/components/useSiteTheme";

const localeOptions = [
  ["ko", "한국어"],
  ["en", "English"],
  ["ja", "日本語"],
  ["zh-CN", "简体中文"],
] as const;

const translations: Record<string, string> = {
  en: "Explain complex flows with one document",
  ja: "複雑な流れを一つの文書で説明しましょう",
  "zh-CN": "用一个文档说明复杂的流程",
};

const document = animationDocumentSchema.parse({
  clothoVersion: 1,
  id: "localized-greeting",
  title: "다국어 Text",
  duration: 3000,
  locales: localeOptions.map(([locale]) => locale),
  canvas: { width: 720, height: 260, background: "transparent" },
  settings: { loop: true, autoplay: true },
  elements: [
    {
      type: "text",
      id: "greeting",
      x: 360,
      y: 135,
      content: "복잡한 흐름을 한 문서로 설명하세요",
      translations,
      fontSize: 28,
      fontWeight: 700,
      textAnchor: "middle",
      color: "#6366f1",
      appearances: [{ start: 0, end: 3000, entryMode: "fade" }],
    },
  ],
});

export function LocalizedTextExample() {
  const [locale, setLocale] = useState("ko");
  const theme = useSiteTheme();
  // Keep the preview useful while the docs deployment may still have the
  // previous package cached. Current Clotho performs the same selection from
  // SceneOptions.locale inside its scene builder.
  const previewDocument = {
    ...document,
    elements: document.elements.map((element) =>
      element.id === "greeting" && element.type === "text"
        ? {
            ...element,
            content: translations[locale] ?? element.content,
          }
        : element,
    ),
  };

  return (
    <div className="localized-example not-prose">
      <div className="localized-example-locales" aria-label="예시 언어">
        {localeOptions.map(([value, label]) => (
          <button
            type="button"
            aria-pressed={locale === value}
            onClick={() => setLocale(value)}
            key={value}
          >
            {label}
          </button>
        ))}
      </div>
      <AnimationPlayer doc={previewDocument} theme={theme} />
    </div>
  );
}
