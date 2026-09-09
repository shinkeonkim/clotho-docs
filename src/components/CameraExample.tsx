import { useMemo, useState } from "react";
import { animationDocumentSchema, computeCamera, type AnimationDocument } from "@kokoa/clotho";
import { AnimationStage, usePlayer } from "@kokoa/clotho/react";
import { useSiteTheme } from "@/components/useSiteTheme";
import source from "@public/animations/documents/camera.json";

const withCamera: AnimationDocument = animationDocumentSchema.parse(source);

// The same document with the camera removed. Rendering both from one clock is the
// whole point of this example: the left stage is what the camera shows, the right
// stage is where that rectangle sits on the canvas.
const wholeCanvas: AnimationDocument = animationDocumentSchema.parse({
  ...source,
  id: "camera-overview",
  camera: undefined,
  settings: { ...source.settings, showCaption: false },
});

function formatMs(value: number): string {
  return `${Math.round(value)} ms`;
}

export function CameraExample() {
  const theme = useSiteTheme();
  const [showFrame, setShowFrame] = useState(true);
  const { player, state } = usePlayer(withCamera);

  const { width, height } = withCamera.canvas;
  // `computeCamera` returns null for a document without a camera, so the fallback is
  // the whole canvas — which is exactly what such a document shows.
  const view = useMemo(
    () =>
      computeCamera(withCamera, state.time) ?? {
        x: 0,
        y: 0,
        width,
        height,
        centerX: width / 2,
        centerY: height / 2,
        zoom: 1,
      },
    [state.time, width, height],
  );

  return (
    <div className="camera-example not-prose">
      <div className="camera-example-stages">
        <figure>
          <figcaption>카메라가 보여주는 화면</figcaption>
          <AnimationStage doc={withCamera} time={state.time} theme={theme} />
        </figure>
        <figure>
          <figcaption>캔버스 전체와 카메라 영역</figcaption>
          <div className="camera-example-overview">
            <AnimationStage doc={wholeCanvas} time={state.time} theme={theme} />
            {showFrame && (
              <svg
                className="camera-example-frame"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <path
                  d={`M0 0H${width}V${height}H0Z M${view.x} ${view.y}H${view.x + view.width}V${view.y + view.height}H${view.x}Z`}
                  fillRule="evenodd"
                  fill="rgba(15,23,42,0.42)"
                />
                <rect
                  x={view.x}
                  y={view.y}
                  width={view.width}
                  height={view.height}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}
          </div>
        </figure>
      </div>

      <div className="camera-example-controls">
        <button type="button" onClick={() => player.toggle()}>
          {state.playing ? "⏸ 일시정지" : "▶ 재생"}
        </button>
        <input
          type="range"
          min={0}
          max={withCamera.duration}
          step={20}
          value={Math.round(state.time)}
          onChange={(event) => player.seek(Number(event.target.value))}
          aria-label="시간"
        />
        <label>
          <input
            type="checkbox"
            checked={showFrame}
            onChange={(event) => setShowFrame(event.target.checked)}
          />
          카메라 영역 표시
        </label>
      </div>

      <dl className="camera-example-readout">
        <div><dt>time</dt><dd>{formatMs(state.time)}</dd></div>
        <div><dt>zoom</dt><dd>{view.zoom.toFixed(2)}×</dd></div>
        <div><dt>center</dt><dd>{view.centerX.toFixed(0)}, {view.centerY.toFixed(0)}</dd></div>
        <div><dt>viewBox</dt><dd>{view.x.toFixed(0)} {view.y.toFixed(0)} {view.width.toFixed(0)} {view.height.toFixed(0)}</dd></div>
      </dl>
    </div>
  );
}
