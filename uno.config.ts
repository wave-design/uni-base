import { presetApplet } from "unocss-applet"
import { defineConfig, presetIcons } from "unocss"

export default defineConfig({
  presets: [
    presetApplet(),
    {
      name: "preset-uni-to-rpx",
      postprocess: (util) => {
        util.entries?.forEach((i) => {
          const value = i[1]
          if (typeof value === "string" && /(-?[.\d]+)rem/g.test(value)) i[1] = value.replace(/(-?[.\d]+)rem/g, (_, p1) => `${p1 / 0.25}rpx`)
        })
      },
    },
    // 支持图标，需要搭配图标库，eg: @iconify-json/carbon, 使用 `<button class="i-carbon-sun dark:i-carbon-moon" />`
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: { display: "inline-block", "vertical-align": "middle" },
    }),
  ],
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }: any) => {
        if (theme.text[c]) return { color: theme.text[c] }
      },
    ],
    [
      /^bg-(.*)$/,
      ([, c], { theme }: any) => {
        if (theme.text[c]) return { "background-color": theme.bg[c] }
      },
    ],
  ],
  theme: {
    text: {
      primary: "rgba(var(--zm-primary-rgb-color), var(--un-text-opacity, 1))",
      success: "rgba(var(--zm-success-rgb-color), var(--un-text-opacity, 1))",
      warning: "rgba(var(--zm-warning-rgb-color), var(--un-text-opacity, 1))",
      error: "rgba(var(--zm-error-rgb-color), var(--un-text-opacity, 1))",
      info: "rgba(var(--zm-info-rgb-color), var(--un-text-opacity, 1))",
      theme: "rgba(var(--zm-theme-rgb-color), var(--un-text-opacity, 1))",
      amount: "rgba(242, 66, 61, var(--un-text-opacity, 1))",
      "grey-000": "rgba(0, 0, 0, var(--un-text-opacity, 1))",
      "grey-111": "rgba(17, 17, 17, var(--un-text-opacity, 1))",
      "grey-222": "rgba(34, 34, 34, var(--un-text-opacity, 1))",
      "grey-333": "rgba(51, 51, 51, var(--un-text-opacity, 1))",
      "grey-444": "rgba(68, 68, 68, var(--un-text-opacity, 1))",
      "grey-555": "rgba(85, 85, 85, var(--un-text-opacity, 1))",
      "grey-666": "rgba(102, 102, 102, var(--un-text-opacity, 1))",
      "grey-777": "rgba(119, 119, 119, var(--un-text-opacity, 1))",
      "grey-888": "rgba(136, 136, 136, var(--un-text-opacity, 1))",
      "grey-999": "rgba(153, 153, 153, var(--un-text-opacity, 1))",
      "grey-aaa": "rgba(170, 170, 170, var(--un-text-opacity, 1))",
      "grey-bbb": "rgba(187, 187, 187, var(--un-text-opacity, 1))",
      "grey-ccc": "rgba(204, 204, 204, var(--un-text-opacity, 1))",
      "grey-ddd": "rgba(221, 221, 221, var(--un-text-opacity, 1))",
      "grey-eee": "rgba(238, 238, 238, var(--un-text-opacity, 1))",
      "grey-fff": "rgba(255, 255, 255, var(--un-text-opacity, 1))",
    },
    bg: {
      primary: "rgba(var(--zm-primary-rgb-color), var(--un-bg-opacity, 1))",
      success: "rgba(var(--zm-success-rgb-color), var(--un-bg-opacity, 1))",
      warning: "rgba(var(--zm-warning-rgb-color), var(--un-bg-opacity, 1))",
      error: "rgba(var(--zm-error-rgb-color), var(--un-bg-opacity, 1))",
      info: "rgba(var(--zm-info-rgb-color), var(--un-bg-opacity, 1))",
      theme: "rgba(var(--zm-theme-rgb-color), var(--un-bg-opacity, 1))",
      amount: "rgba(242, 66, 61, var(--un-bg-opacity, 1))",
      "grey-000": "rgba(0, 0, 0, var(--un-bg-opacity, 1))",
      "grey-111": "rgba(17, 17, 17, var(--un-bg-opacity, 1))",
      "grey-222": "rgba(34, 34, 34, var(--un-bg-opacity, 1))",
      "grey-333": "rgba(51, 51, 51, var(--un-bg-opacity, 1))",
      "grey-444": "rgba(68, 68, 68, var(--un-bg-opacity, 1))",
      "grey-555": "rgba(85, 85, 85, var(--un-bg-opacity, 1))",
      "grey-666": "rgba(102, 102, 102, var(--un-bg-opacity, 1))",
      "grey-777": "rgba(119, 119, 119, var(--un-bg-opacity, 1))",
      "grey-888": "rgba(136, 136, 136, var(--un-bg-opacity, 1))",
      "grey-999": "rgba(153, 153, 153, var(--un-bg-opacity, 1))",
      "grey-aaa": "rgba(170, 170, 170, var(--un-bg-opacity, 1))",
      "grey-bbb": "rgba(187, 187, 187, var(--un-bg-opacity, 1))",
      "grey-ccc": "rgba(204, 204, 204, var(--un-bg-opacity, 1))",
      "grey-ddd": "rgba(221, 221, 221, var(--un-bg-opacity, 1))",
      "grey-eee": "rgba(238, 238, 238, var(--un-bg-opacity, 1))",
      "grey-fff": "rgba(255, 255, 255, var(--un-bg-opacity, 1))",
      "grey-theme": "rgba(245, 245, 245, var(--un-bg-opacity, 1))",
    },
    colors: {
      primary: "var(--zm-primary-color)",
      success: "var(--zm-success-color)",
      warning: "var(--zm-warning-color)",
      error: "var(--zm-error-color)",
      info: "var(--zm-info-color)",
      theme: "var(--zm-theme-color)",
      amount: "#f2423d",
      gray: "#808080",
      "grey-000": "#000000",
      "grey-111": "#111111",
      "grey-222": "#222222",
      "grey-333": "#333333",
      "grey-444": "#444444",
      "grey-555": "#555555",
      "grey-666": "#666666",
      "grey-777": "#777777",
      "grey-888": "#888888",
      "grey-999": "#999999",
      "grey-aaa": "#aaaaaa",
      "grey-bbb": "#bbbbbb",
      "grey-ccc": "#cccccc",
      "grey-ddd": "#dddddd",
      "grey-eee": "#eeeeee",
      "grey-fff": "#ffffff",
      "grey-theme": "#f5f5f5",
    },
  },
})
