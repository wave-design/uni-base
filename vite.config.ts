import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import useVitePlugins from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'))

  return defineConfig({
    envDir: './env',
    base: env.VITE_APP_BASE,
    plugins: useVitePlugins(mode, env),
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
      },
    },
    server: {
      hmr: true,
      port: Number.parseInt(env.VITE_APP_PORT, 10),
      proxy: {
        [env.VITE_API_PREFIX]: {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_API_PREFIX}`), ''),
        },
      },
    },
    esbuild: {
      drop: env.VITE_DELETE_CONSOLE === 'true' ? ['console', 'debugger'] : [],
    },
    build: {
      target: 'es6',
      sourcemap: false,
      minify: mode === 'development' ? false : 'esbuild',
    },
  })
})
