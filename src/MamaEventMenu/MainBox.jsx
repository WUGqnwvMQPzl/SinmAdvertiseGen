import { AbsoluteFill, Img, staticFile } from "remotion";

export const MainBox = ({ style, children }) => (
  <AbsoluteFill style={{ ...style, left: 124, width: 830 }}>
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
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);
