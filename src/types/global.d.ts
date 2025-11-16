declare global {


}

declare module '@uni-helper/vite-plugin-uni-pages' {
  interface UserPageMeta {
    /**
     * 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
     *
     * 尽量保证一个项目 只有一个 这个配置，如果有多个，会按照字母顺序来排列，最终可能不是您想要的效果。
     */
    type?: 'home'
    /**
     * 页面布局类型, 模板默认只有 default, 如果在 src/layouts 下新增了 layout, 可以扩展当前属性
     * @default 'default'
     *
     * 当前属性供 https://github.com/uni-helper/vite-plugin-uni-layouts 插件使用
     */
    layout?: 'default'
    /**
     * 是否从需要登录的路径中排除
     *
     * 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 src/router 文件夹
     */
    excludeLoginPath?: boolean
  }
}

export { }
