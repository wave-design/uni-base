import { createHtmlPlugin } from "vite-plugin-html"

export default function createHtml() {
  return createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        env: process.env.VITE_ENV,
      },
    },
  })
}
