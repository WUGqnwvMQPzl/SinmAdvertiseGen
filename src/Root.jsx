import { Composition } from "remotion";
import { calculateMetadata, MamaEventMenu } from "./MamaEventMenu";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MamaEventMenu"
        component={MamaEventMenu}
        durationInFrames={3600}
        fps={60}
        width={1080}
        height={1080}
        calculateMetadata={calculateMetadata}
      />
    </>
  );
};
