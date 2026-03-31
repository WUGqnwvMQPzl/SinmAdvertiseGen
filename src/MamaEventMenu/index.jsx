import { AbsoluteFill, AnimatedImage, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { ALL_FORMATS, Input, UrlSource } from "mediabunny";

import { MonitorMask } from "./MonitorMask";

import "./style.css";

// TODO: custom input
const VIDEO_INPUT = staticFile("/vid/placeholder.webm")

export const MamaEventMenu = ({ data }) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const fadeOutStartFrame = data.videoDuration - 85;

  var mainXEasing = frame < fadeOutStartFrame ? Easing.out(Easing.cubic) : Easing.in(Easing.ease);
  const mainX = interpolate(
    frame,
    [26, 60, fadeOutStartFrame, fadeOutStartFrame + 30],
    [117, 51, 51, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: mainXEasing }
  );

  const mainOpacity = interpolate(
    frame,
    [fadeOutStartFrame, fadeOutStartFrame + 30],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - 70, durationInFrames - 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill style={{ opacity: fadeOutOpacity }}>
        <Video src={staticFile("/vid/circle_bg_crf20.mp4")} loop />
        <AbsoluteFill>
          <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/inner2.webp")} loopBehavior="clear-after-finish" />
          <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/inner1.webp")} loopBehavior="clear-after-finish" />
        </AbsoluteFill>
        <AbsoluteFill style={{ top: mainX, left: 124, width: 830, opacity: mainOpacity }}>
          <Img style={{ position: "absolute", left: 44, width: 744 }} src={staticFile("/img/UI_INF_Base_01_edit.png")} />
          <div className="ring" style={{ maskImage: `url('${staticFile("/img/UI_INF_Base_02.png")}')`, background: "#319DF8" }}></div>
          <div className="ring" style={{ maskImage: `url('${staticFile("/img/UI_INF_Base_03.png")}')`, background: "#FF8DB0" }}></div>
          <Img style={{ position: "absolute", top: 21, left: 204, width: 424 }} src={staticFile("/img/UI_INF_Title.png")} />
          <Img style={{ position: "absolute", top: 77, left: 373, width: 86 }} src={staticFile("/img/UI_INF_Parts02_01.png")} />
          <Img style={{ position: "absolute", top: 129, left: 376, width: 79, zIndex: 1 }} src={staticFile("/img/UI_INF_Parts02_05.png")} />
          <Img style={{ position: "absolute", top: 92, left: 318, width: 62 }} src={staticFile("/img/UI_INF_Parts02_02.png")} />
          <Img style={{ position: "absolute", top: 92, left: 452, width: 62 }} src={staticFile("/img/UI_INF_Parts02_03.png")} />
          <Img style={{ position: "absolute", top: 138, left: 6 }} src={staticFile("/img/box.png")} />
          <AbsoluteFill style={{ top: 176, left: 42, width: 748, height: 423, padding: 2, background: "#D3D3D3", borderRadius: 3, boxSizing: "border-box" }}>
            <Video src={VIDEO_INPUT} />
          </AbsoluteFill>
        </AbsoluteFill>
        <AbsoluteFill style={{ zIndex: 3 }}>
          <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/outer3.webp")} loopBehavior="clear-after-finish" />
          <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/outer2.webp")} loopBehavior="clear-after-finish" />
          <AnimatedImage style={{ position: "absolute" }} src={staticFile("/transition/outer1.webp")} loopBehavior="clear-after-finish" />
        </AbsoluteFill>
      </AbsoluteFill>
      <MonitorMask />
    </AbsoluteFill>
  );
};

export const calculateMetadata = async ({ prop }) => {
  const mediaInput = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(VIDEO_INPUT)
  });

  if (await mediaInput.getPrimaryVideoTrack() == null)
    throw new Error("Not a video file");

  const videoDuration = Math.floor(await mediaInput.computeDuration() * 60);

  return {
    durationInFrames: videoDuration + 10,
    props: {
      ...prop,
      data: {
        videoDuration
      }
    }
  };
};
