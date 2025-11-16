import compression from "vite-plugin-compression"

export default function createCompression() {
  return compression({ threshold: 10240, algorithm: "gzip" })
}
