import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages"

export default defineUniPages({
  globalStyle: {
    navigationStyle: "default",
    backgroundColor: "#ffffff",
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-base",
    navigationBarBackgroundColor: "#ffffff",
  },
  easycom: {
    autoscan: true,
    custom: {
      "^ui-(.*)": "@/ui/ui-$1/ui-$1.vue"
    },
  },
  // 原生 tabbar 配置
  tabBar: {
    color: "#000000",
    selectedColor: "#13227a",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    height: "50px",
    fontSize: "10px",
    iconWidth: "24px",
    spacing: "3px",
    list: [
      {
        text: "首页",
        pagePath: "pages/tabbar/index/index",
        iconPath: "static/tabbar/index.png",
        selectedIconPath: "static/tabbar/index-active.png",
      },
      {
        text: "我的",
        pagePath: "pages/tabbar/person/index",
        iconPath: "static/tabbar/person.png",
        selectedIconPath: "static/tabbar/person-active.png",
      },
    ],
  },
})
