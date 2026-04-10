import path from "path";
import http from "http";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import serveHandler from "serve-handler";

const staticSvr = http.createServer((req, res) => serveHandler(req, res, {
  public: path.resolve("./inputs"),
  directoryListing: false,
  headers: [
    {
      "source": "**",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Headers", "value": "*" },
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Private-Network", "value": "true" }
      ]
    }
  ]
}));

staticSvr.listen(10016, "127.0.0.1");

// TODO: config file and command parameters
const props = {
  inputBackground: "",  // inputs/backgrounds/*
  inputContent: ""  // inputs/contents/*
};

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

  concurrency: 1,
  // hardwareAcceleration: "if-possible",

  chromeMode: "headless-shell",

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
  outputLocation: path.resolve("./out/output.mp4"),
  separateAudioTo: path.resolve("./out/output.wav")
});

staticSvr.close();
