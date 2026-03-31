import { AbsoluteFill, AnimatedImage, staticFile } from "remotion";

export const InnerTransition = () => (
  <AbsoluteFill>
    <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/inner2.webp")} loopBehavior="clear-after-finish" />
    <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/inner1.webp")} loopBehavior="clear-after-finish" />
  </AbsoluteFill>
);
