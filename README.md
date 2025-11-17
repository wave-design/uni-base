# uni-base

一个基于 UniApp v3 + Vue 3 + Vite 5 的跨端项目基础模板，集成 Pinia、UnoCSS、请求封装（alova）、路由拦截、自动生成 pages/manifest 等常用能力，开箱即用，适配 H5、App、微信小程序等多端。

## 特性
- Vue 3 组合式开发，Pinia 状态管理（持久化）
- UnoCSS 原子化样式，支持本地 SVG 图标集合与安全区规则
- Vite 5 构建，统一 `env/` 环境变量目录与代理配置
- alova + `@alova/adapter-uniapp` 请求封装，支持刷新 Token
- 路由拦截与登录策略说明，见 `src/router/README.md`
- ESLint + Husky + lint-staged 保障代码质量

## 环境要求
- Node `>= 20`
- pnpm `>= 9`（本项目强制使用 pnpm，见 `package.json` 的 `preinstall`）

## 快速开始
- 安装依赖：`pnpm install`
- 初始化：`pnpm prepare`
  - 初始化 Husky 钩子并自动生成 `src/pages.json`、`src/manifest.json`（脚本：`scripts/initialize.js`）
- 开发调试：
  - H5：`pnpm dev:h5`
  - 微信小程序：`pnpm dev:mp-weixin`
  - App：`pnpm dev:app`
  - 通用：`pnpm dev`（依据 `UNI_PLATFORM`）
- 构建打包：
  - H5：`pnpm build:h5` / `pnpm build:h5:prod`
  - 微信小程序：`pnpm build:mp-weixin`
  - App：`pnpm build:app`
  - SSR：`pnpm dev:h5:ssr` / `pnpm build:h5:ssr`
  - 更多平台脚本请查看 `package.json` 的 `scripts`

## 环境变量
- 目录：`env/`（在 `vite.config.ts:40` 指定 `envDir: './env'`）
- 通用：
  - `VITE_APP_BASE`、`VITE_APP_PORT`、`VITE_APP_NAME`、`VITE_WX_APPID`、`VITE_UNI_APPID`
- 开发环境：
  - `VITE_DELETE_CONSOLE`、`VITE_SHOW_SOURCEMAP`、`VITE_API_PREFIX`、`VITE_API_BASE_URL`
- 测试/生产：
  - `VITE_HTTP_BASEURL`
- Manifest 相关（可选，用于 `manifest.config.ts`）：
  - `VITE_APP_TITLE`、`VITE_APP_PUBLIC_BASE`、`VITE_FALLBACK_LOCALE`
- 示例（节选）：
  - `env/.env.development`：
    ```env
    VITE_DELETE_CONSOLE=false
    VITE_API_PREFIX=/api
    VITE_API_BASE_URL=
    ```
  - `env/.env.production`：
    ```env
    VITE_DELETE_CONSOLE=true
    VITE_HTTP_BASEURL=
    ```

## 目录结构（节选）
- `src/pages/` 页面与 TabBar 结构
- `src/layouts/default.vue` 基础布局
- `src/store/auth/` 认证状态与刷新 Token
- `src/http/core.ts` 请求封装与响应拦截
- `src/router/interceptor.ts` 导航拦截插件
- `uno.config.ts` UnoCSS 预设、图标与主题配置
- `vite.config.ts` 别名、代理与构建配置

## 路由与登录拦截
- 在应用初始化时安装导航拦截：`src/main.ts:9-13`
  ```ts
  app.use(routeInterceptor)
  ```
- 登录策略详解、黑/白名单与 `definePage` 扩展见 `src/router/README.md`

## 网络请求与鉴权
- 封装位置：`src/http/core.ts`
- 基础地址：`import.meta.env.VITE_API_PREFIX` 或 `VITE_HTTP_BASEURL`（`src/http/core.ts:61-66`）
- 刷新 Token：`createServerTokenAuthentication` 统一处理过期状态与刷新逻辑（`src/http/core.ts:9-59`）
- 响应拦截：统一状态码与业务码处理（`src/http/core.ts:68-110`）

## 样式与图标
- UnoCSS：预设与动态图标白名单（`uno.config.ts:74`），安全区规则与主题色（`uno.config.ts:75-95`）
- 别名：`@` 指向 `src`，`@img` 指向 `src/static/images`（`vite.config.ts:57-61`）

## App 配置（节选）
- 通过 `manifest.config.ts` 统一生成 Manifest（`manifest.config.ts:13-22`）
- H5 路由基底：`h5.router.base`（`manifest.config.ts:28-33`）
- App 图标资源：`app-plus.distribute.icons`（`manifest.config.ts:95-112`）

## 代码质量与校验
- ESLint 配置：`eslint.config.mjs`（忽略生成文件与常用规则）
- 运行检查：`pnpm lint`、`pnpm type-check`

## License
- MIT