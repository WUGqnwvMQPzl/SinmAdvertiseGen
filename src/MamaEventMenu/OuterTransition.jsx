import { AbsoluteFill, AnimatedImage, staticFile } from "remotion";

export const OuterTransition = () => (
  <AbsoluteFill style={{ zIndex: 3 }}>
    <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/outer3.webp")} loopBehavior="clear-after-finish" />
    <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/outer2.webp")} loopBehavior="clear-after-finish" />
    <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/outer1.webp")} loopBehavior="clear-after-finish" />
  </AbsoluteFill>
);
