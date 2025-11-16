import dayjs from 'dayjs'

export default function useHtmlTransformPlugin(title: string) {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html
        .replace('%BUILD_TIME%', dayjs().format('YYYY-MM-DD HH:mm:ss'))
        .replace('%VITE_APP_TITLE%', title)
    },
  }
}
export {}
