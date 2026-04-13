import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { ALL_FORMATS, Input, UrlSource } from "mediabunny";

import { MonitorMask } from "./MonitorMask";
import { OuterTransition } from "./OuterTransition";
import { InnerTransition } from "./InnerTransition";
import { MainBox } from "./MainBox";

import "./style.css";

export const MamaEventMenu = ({ inputBackground, inputContent, data }) => {
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
        <Video style={{ width: 1080, height: 1080 }} objectFit="cover" src={`http://127.0.0.1:10016/backgrounds/${inputBackground}`} muted loop />
        <InnerTransition />
        <MainBox style={{ top: mainX, opacity: mainOpacity }}>
          <Video style={{ width: "100%", height: "100%", background: "#000" }} src={`http://127.0.0.1:10016/contents/${inputContent}`} />
        </MainBox>
        <OuterTransition />
      </AbsoluteFill>
      <MonitorMask />
    </AbsoluteFill>
  );
};

export const calculateMetadata = async ({ props }) => {
  const mediaInput = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(`http://127.0.0.1:10016/contents/${props.inputContent}`)
  });

  if (await mediaInput.getPrimaryVideoTrack() == null)
    throw new Error("Not a video file");

  const videoDuration = Math.floor(await mediaInput.computeDuration() * 60);

  return {
    durationInFrames: videoDuration + 10,
    props: {
      ...props,
      data: {
        videoDuration
      }
    }
  };
};
