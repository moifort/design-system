import { useId } from "react";
import styled, { useTheme } from "styled-components";

const Svg = styled.svg`
  display: block;
  width: 100%;
  height: 36px;
  overflow: visible;
`;

const points = (data: number[], w: number, h: number, max: number) => {
  const step = w / (data.length - 1);
  return data.map((p, i) => [i * step, h - (p / max) * h] as const);
};

const toLine = (pts: ReadonlyArray<readonly [number, number]>) =>
  pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

type SparklineProps = { download: number[]; upload: number[] };

/** Tiny dual-series throughput sparkline — download (aqua, filled) over upload (purple).
 *  On e-ink both series are black; upload is dashed to stay distinguishable. */
export function Sparkline({ download, upload }: SparklineProps) {
  const W = 120;
  const H = 36;
  const id = useId();
  const theme = useTheme();
  const isEink = theme.mode === "eink";
  const max = Math.max(...download, ...upload, 1) * 1.1;
  const dl = points(download, W, H, max);
  const up = points(upload, W, H, max);
  const area = `${toLine(dl)} L ${W} ${H} L 0 ${H} Z`;

  return (
    <Svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {!isEink && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.color.download} stopOpacity="0.18" />
            <stop offset="100%" stopColor={theme.color.download} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {!isEink && <path d={area} fill={`url(#${id})`} stroke="none" />}
      <path
        d={toLine(up)}
        fill="none"
        stroke={theme.color.upload}
        strokeWidth={isEink ? 1.5 : 1.25}
        strokeDasharray={isEink ? "3 2" : undefined}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={toLine(dl)}
        fill="none"
        stroke={theme.color.download}
        strokeWidth={isEink ? 1.5 : 1.25}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
