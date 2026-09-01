import { animationDocumentSchema, type AnimationDocument } from "@kokoa/clotho";

export const elementSlugs = [
  "rect",
  "circle",
  "line",
  "arrow",
  "text",
  "image",
  "path",
  "polygon",
  "group",
  "code",
] as const;
export type ElementSlug = (typeof elementSlugs)[number];
export interface ElementGuide {
  title: string;
  summary: string;
  options: readonly [string, string, string][];
  document: AnimationDocument;
}

const visible = [
  {
    start: 0,
    end: 4000,
    entryMode: "fade" as const,
    entryDuration: 350,
    exitDuration: 0,
  },
];
const base = {
  clothoVersion: 1 as const,
  duration: 4000,
  canvas: { width: 640, height: 300, background: "transparent" },
  settings: { loop: true, autoplay: true },
};
const doc = (id: string, title: string, elements: unknown[], assets = {}) =>
  animationDocumentSchema.parse({
    ...base,
    id: `element-${id}`,
    title,
    elements,
    assets,
  });
const boxA = {
  type: "rect",
  id: "source",
  x: 70,
  y: 105,
  width: 140,
  height: 80,
  label: "source",
  appearances: visible,
};
const boxB = {
  type: "rect",
  id: "target",
  x: 430,
  y: 105,
  width: 140,
  height: 80,
  label: "target",
  appearances: visible,
  tracks: [
    {
      property: "y",
      keyframes: [
        { time: 0, value: 105 },
        { time: 2000, value: 55 },
        { time: 4000, value: 105 },
      ],
    },
  ],
};

export const elementGuides: Record<ElementSlug, ElementGuide> = {
  rect: {
    title: "Rectangle",
    summary: "카드, 배열 칸과 논리적인 영역을 표현하는 기본 사각형입니다.",
    options: [
      ["x, y", "number", "좌측 상단 좌표"],
      ["width, height", "positive number", "크기"],
      ["fill, stroke", "string", "채우기와 테두리 색"],
      ["strokeWidth", "number ≥ 0", "테두리 굵기, 기본 1.5"],
      ["cornerRadius", "number ≥ 0", "모서리 반경, 기본 8"],
      ["label, subtitle", "string?", "가운데 제목과 보조 문구"],
      ["labelColor", "string", "제목 색, 기본 #0b0b0f"],
      ["labelSize, subtitleSize", "positive number", "문자 크기"],
    ],
    document: doc("rect", "Rectangle", [
      {
        type: "rect",
        id: "card",
        x: 185,
        y: 80,
        width: 270,
        height: 140,
        cornerRadius: 22,
        label: "Rectangle",
        subtitle: "size · color · radius",
        appearances: visible,
        tracks: [
          {
            property: "width",
            keyframes: [
              { time: 0, value: 220 },
              { time: 2000, value: 300 },
              { time: 4000, value: 220 },
            ],
          },
          {
            property: "fill",
            interpolate: "color",
            keyframes: [
              { time: 0, value: "#c7d2fe" },
              { time: 2000, value: "#a7f3d0" },
              { time: 4000, value: "#c7d2fe" },
            ],
          },
        ],
      },
    ]),
  },
  circle: {
    title: "Circle",
    summary: "그래프 노드, 상태점과 원형 강조 영역을 표현합니다.",
    options: [
      ["cx, cy", "number", "원의 중심"],
      ["r", "positive number", "반지름"],
      ["fill, stroke", "string", "채우기와 테두리 색"],
      ["strokeWidth", "number ≥ 0", "테두리 굵기"],
      ["label", "string?", "가운데 문구"],
      ["labelColor, labelSize", "string, positive number", "문구 색과 크기"],
    ],
    document: doc("circle", "Circle", [
      {
        type: "circle",
        id: "node",
        cx: 320,
        cy: 150,
        r: 70,
        label: "node",
        appearances: visible,
        tracks: [
          {
            property: "r",
            keyframes: [
              { time: 0, value: 55 },
              { time: 2000, value: 85 },
              { time: 4000, value: 55 },
            ],
          },
        ],
      },
    ]),
  },
  line: {
    title: "Line",
    summary: "좌표 또는 다른 요소의 anchor를 잇는 방향 없는 연결선입니다.",
    options: [
      ["x1, y1, x2, y2", "number?", "고정 endpoint 좌표"],
      ["fromId, toId", "ID?", "추적할 요소 ID"],
      ["fromAnchor, toAnchor", "Anchor?", "요소 위 연결 위치"],
      ["stroke, strokeWidth", "string, positive number", "선 색과 굵기"],
      ["strokeDasharray", "string?", "SVG dash pattern"],
      ["headStart, headEnd", "ArrowHead?", "양 끝 장식"],
    ],
    document: doc("line", "Line", [
      boxA,
      boxB,
      {
        type: "line",
        id: "link",
        fromId: "source",
        toId: "target",
        fromAnchor: "right",
        toAnchor: "left",
        stroke: "#6366f1",
        strokeWidth: 3,
        appearances: visible,
      },
    ]),
  },
  arrow: {
    title: "Arrow",
    summary:
      "Line의 endpoint 기능에 방향, 곡률과 label을 더한 연결 요소입니다.",
    options: [
      ["Line의 모든 endpoint", "connector", "좌표 또는 ID·anchor"],
      ["curvature", "number", "곡선 굽힘, 기본 0"],
      ["label", "string?", "연결선 문구"],
      ["labelColor", "string", "문구 색"],
      ["labelOffsetX, labelOffsetY", "number", "문구 위치 보정"],
      ["headStart, headEnd", "ArrowHead?", "기본값을 포함한 양 끝 장식"],
    ],
    document: doc("arrow", "Arrow", [
      boxA,
      boxB,
      {
        type: "arrow",
        id: "flow",
        fromId: "source",
        toId: "target",
        fromAnchor: "right",
        toAnchor: "left",
        curvature: -0.2,
        label: "tracks movement",
        headEnd: "triangle",
        appearances: visible,
      },
    ]),
  },
  text: {
    title: "Text",
    summary: "설명, 수식과 상태 문구를 canvas 좌표에 배치합니다.",
    options: [
      ["x, y", "number", "text 기준 좌표"],
      ["content", "string", "기본 문구"],
      ["locales", "locale tag[]?", "요소별 언어 목록"],
      ["translations", "Record<locale, string>", "언어별 번역 문구"],
      ["fontSize", "positive number", "기본 16"],
      ["fontWeight", "string | number", "기본 400"],
      ["color", "string", "글자 색"],
      ["textAnchor", "start | middle | end", "가로 정렬 기준"],
    ],
    document: doc("text", "Text", [
      {
        type: "text",
        id: "message",
        x: 320,
        y: 155,
        content: "시간에 따라 바뀌는 설명",
        translations: {
          en: "Description over time",
          ja: "時間とともに変わる説明",
          "zh-CN": "随时间变化的说明",
        },
        fontSize: 30,
        fontWeight: 700,
        textAnchor: "middle",
        color: "#6366f1",
        appearances: visible,
        tracks: [
          {
            property: "content",
            interpolate: "discrete",
            keyframes: [
              { time: 0, value: "시작" },
              { time: 1400, value: "계산 중" },
              { time: 2800, value: "완료" },
            ],
          },
        ],
      },
    ]),
  },
  image: {
    title: "Image",
    summary: "문서의 asset registry를 참조하여 이미지를 재사용합니다.",
    options: [
      ["x, y", "number", "좌측 상단 좌표"],
      ["width, height", "positive number", "표시 크기"],
      ["assetId", "string", "assets map의 key"],
      ["alt", "string?", "접근성 설명"],
      ["preserveAspectRatio", "string", "SVG 비율 규칙"],
      ["opacity", "0…1", "불투명도"],
    ],
    document: doc(
      "image",
      "Image",
      [
        {
          type: "image",
          id: "check-image",
          x: 245,
          y: 75,
          width: 150,
          height: 150,
          assetId: "check",
          alt: "완료를 나타내는 체크 표시",
          appearances: visible,
          tracks: [
            {
              property: "opacity",
              keyframes: [
                { time: 0, value: 0.4 },
                { time: 2000, value: 1 },
                { time: 4000, value: 0.4 },
              ],
            },
          ],
        },
      ],
      {
        check: {
          kind: "inline",
          mime: "image/svg+xml",
          data: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjIiIGZpbGw9IiM2MzY2ZjEiLz48cGF0aCBkPSJNMTQgMjVsNyA3IDEzLTE1IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+",
        },
      },
    ),
  },
  path: {
    title: "Path",
    summary: "SVG path의 d 명령으로 자유로운 선과 도형을 그립니다.",
    options: [
      ["d", "string", "SVG path data"],
      ["x, y", "number", "path 이동값, 기본 0"],
      ["fill, stroke", "string", "채우기와 선 색"],
      ["strokeWidth", "number ≥ 0", "선 굵기"],
      ["strokeDasharray", "string?", "dash pattern"],
      ["opacity", "0…1", "불투명도"],
    ],
    document: doc("path", "Path", [
      {
        type: "path",
        id: "curve",
        x: 100,
        y: 95,
        d: "M 0 90 C 100 -50 240 190 440 30",
        fill: "none",
        stroke: "#6366f1",
        strokeWidth: 6,
        appearances: visible,
      },
    ]),
  },
  polygon: {
    title: "Polygon",
    summary: "SVG points 문자열로 삼각형부터 임의의 다각형까지 표현합니다.",
    options: [
      ["points", "string", "x,y 좌표 쌍 목록"],
      ["fill, stroke", "string", "채우기와 테두리 색"],
      ["strokeWidth", "number ≥ 0", "테두리 굵기"],
      ["opacity", "0…1", "불투명도"],
    ],
    document: doc("polygon", "Polygon", [
      {
        type: "polygon",
        id: "hexagon",
        points: "320,55 405,100 405,200 320,245 235,200 235,100",
        fill: "#ddd6fe",
        stroke: "#7c3aed",
        strokeWidth: 4,
        appearances: visible,
        tracks: [
          {
            property: "rotation",
            keyframes: [
              { time: 0, value: 0 },
              { time: 4000, value: 360 },
            ],
          },
        ],
      },
    ]),
  },
  group: {
    title: "Group",
    summary:
      "여러 자식의 위치, 회전, 표시 상태를 하나의 transform으로 관리합니다.",
    options: [
      ["x, y", "number", "자식 좌표의 원점"],
      ["rotation", "number", "group 전체 회전"],
      ["parentId", "ID?", "다른 group 안에 중첩"],
      ["자식 연결", "child.parentId", "자식이 group ID를 참조"],
    ],
    document: doc("group", "Group", [
      {
        type: "group",
        id: "cluster",
        x: 230,
        y: 90,
        appearances: visible,
        tracks: [
          {
            property: "x",
            keyframes: [
              { time: 0, value: 170 },
              { time: 2000, value: 300 },
              { time: 4000, value: 170 },
            ],
          },
        ],
      },
      {
        type: "rect",
        id: "child-a",
        parentId: "cluster",
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        label: "A",
        appearances: visible,
      },
      {
        type: "circle",
        id: "child-b",
        parentId: "cluster",
        cx: 130,
        cy: 40,
        r: 40,
        label: "B",
        appearances: visible,
      },
    ]),
  },
  code: {
    title: "Code",
    summary: "구문 강조와 줄 번호를 포함하는 code block을 canvas에 배치합니다.",
    options: [
      ["x, y", "number", "좌측 상단 좌표"],
      ["width, height", "positive number", "block 크기"],
      ["content", "string", "source code"],
      ["language", "string", "highlighter 언어"],
      ["fontSize", "positive number", "문자 크기"],
      ["showLineNumbers", "boolean", "줄 번호 표시"],
      ["fill, textColor", "string", "배경과 기본 문자 색"],
      ["padding, cornerRadius", "number ≥ 0", "안쪽 여백과 모서리"],
      ["title", "string?", "상단 제목"],
    ],
    document: doc("code", "Code", [
      {
        type: "code",
        id: "snippet",
        x: 120,
        y: 45,
        width: 400,
        height: 210,
        title: "iteration.ts",
        language: "javascript",
        showLineNumbers: true,
        content:
          "for (const item of items) {\n  visit(item);\n}\n\nreturn result;",
        appearances: visible,
      },
    ]),
  },
};
