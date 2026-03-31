import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { ALL_FORMATS, Input, UrlSource } from "mediabunny";

import { MonitorMask } from "./MonitorMask";
import { OuterTransition } from "./OuterTransition";
import { InnerTransition } from "./InnerTransition";
import { MainBox } from "./MainBox";

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
        <InnerTransition />
        <MainBox style={{ top: mainX, opacity: mainOpacity }}>
          <Video src={VIDEO_INPUT} />
        </MainBox>
        <OuterTransition />
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
