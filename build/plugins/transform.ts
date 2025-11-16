import dayjs from "dayjs"

export default function createTransform() {
  return process.env.UNI_PLATFORM === "h5"
    ? {
        name: "html-transform",
        transformIndexHtml(html: string) {
          return html.replace("%BUILD_DATE%", dayjs().format("YYYY-MM-DD HH:mm:ss"))
        },
      }
    : null
}
