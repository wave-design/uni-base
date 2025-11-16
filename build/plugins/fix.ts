import type { PluginOption } from "vite"

export default function createFix(): PluginOption {
  return {
    // 临时解决 dcloudio 官方的 @dcloudio/uni-mp-compiler 出现的编译 BUG
    // 参考 github issue: https://github.com/dcloudio/uni-app/issues/4952
    // 自定义插件禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
    name: "fix-vite-plugin-vue",
    configResolved(config) {
      const plugin = config.plugins.find((p) => p.name === "vite:vue")
      if (plugin && plugin.api && plugin.api.options) {
        plugin.api.options.devToolsEnabled = false
      }
    },
  }
}
