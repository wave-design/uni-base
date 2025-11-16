import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import useVitePlugins from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // @see https://unocss.dev/
  // const UnoCSS = (await import('unocss/vite')).default
  // console.log(mode === process.env.NODE_ENV) // true

  // mode: 区分生产环境还是开发环境
  console.log('command, mode -> ', command, mode)
  // pnpm dev:h5 时得到 => serve development
  // pnpm build:h5 时得到 => build production
  // pnpm dev:mp-weixin 时得到 => build development (注意区别，command为build)
  // pnpm build:mp-weixin 时得到 => build production
  // pnpm dev:app 时得到 => build development (注意区别，command为build)
  // pnpm build:app 时得到 => build production
  // dev 和 build 命令可以分别使用 .env.development 和 .env.production 的环境变量

  const { UNI_PLATFORM } = process.env
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM) // 得到 mp-weixin, h5, app 等

  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'))
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_DELETE_CONSOLE,
    VITE_APP_BASE,
    VITE_API_PREFIX,
    VITE_APP_PROXY_ENABLE,
    VITE_API_BASE_URL,
    VITE_HTTP_BASEURL,
  } = env
  console.log('🚀 ~ vite.config.ts:36 ~ VITE_HTTP_BASEURL:', VITE_HTTP_BASEURL)
  console.log('环境变量 env -> ', env)

  return defineConfig({
    envDir: './env', // 自定义env目录
    base: VITE_APP_BASE,
    plugins: useVitePlugins(mode, env),
    define: {
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY_ENABLE),
    },
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ],
      },
    },

    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '@img': path.join(process.cwd(), './src/static/images'),
      },
    },
    server: {
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      proxy: {
        [VITE_API_PREFIX]: {
          target: VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${VITE_API_PREFIX}`), ''),
        },
      },
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === 'true' ? ['console', 'debugger'] : [],
    },
    build: {
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: 'es6',
      // 开发环境不用压缩
      minify: mode === 'development' ? false : 'esbuild',
    },
  })
})
