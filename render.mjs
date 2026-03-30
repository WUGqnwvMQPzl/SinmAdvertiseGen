import path from "path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

const props = {}

const bundleUrl = await bundle({
  entryPoint: path.resolve("./src/index.js")
});

const comp = await selectComposition({
  serveUrl: bundleUrl,
  id: "MamaEventMenu",
  inputProps: props
});

await renderMedia({
  composition: comp,
  serveUrl: bundleUrl,
  inputProps: props,

  concurrency: 12,
  hardwareAcceleration: "if-possible",

  chromeMode: "chrome-for-testing",
  chromiumOptions: {
    gl: "egl"
  },

  /* codec: "vp9",
  crf: 28, */
  codec: "h264",
  crf: 20,
  pixelFormat: "yuv420p",
  imageFormat: "jpeg",
  jpegQuality: 100,

  audioCodec: "pcm-16",
  preferLossless: true,

  overwrite: true,
  outputLocation: path.resolve("./out/output_png.mp4"),
  separateAudioTo: path.resolve("./out/output.wav")
});
