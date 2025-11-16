import { visualizer } from "rollup-plugin-visualizer"

export default function createTransform() {
  return process.env.UNI_PLATFORM === "h5"
    ? visualizer({
        gzipSize: true,
        brotliSize: true,
        filename: "stats.html",
      })
    : null
}
