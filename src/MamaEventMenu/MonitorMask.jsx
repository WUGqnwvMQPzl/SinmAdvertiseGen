import { AbsoluteFill } from "remotion";

export const MonitorMask = () => (
  <AbsoluteFill style={{ zIndex: 99 }}>
    <svg viewBox="0 0 1080 1080">
      <defs>
        <mask id="cut">
          <rect width="1080" height="1080" fill="white"/>
          <circle cx="540" cy="540" r="540"/>
        </mask>
      </defs>
      <rect width="1080" height="1080" mask="url(#cut)"/>
    </svg>
  </AbsoluteFill>
);
