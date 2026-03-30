// All configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./src/index.js");

Config.setConcurrency(12);
Config.setHardwareAcceleration("if-possible");
Config.setChromeMode("chrome-for-testing");
Config.setChromiumOpenGlRenderer("egl");

Config.setCodec("vp9");
Config.setCrf(28);
Config.setVideoBitrate("0k");
Config.setPixelFormat("yuv420p");
Config.setVideoImageFormat("png");

Config.setAudioCodec("pcm-16");
Config.setPreferLosslessAudio(true);
