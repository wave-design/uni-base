import path from "node:path"
import TransformPages from "uni-read-pages-vite"
import createVitePlugins from "./build/plugins"
import { defineConfig, loadEnv } from "vite"

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), "env"))

  for (const key in env) {
    process.env[key] = env[key]
  }

  return defineConfig({
    envDir: "./env",
    plugins: createVitePlugins(env),
    define: {
      ROUTES: new TransformPages().routes,
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api", "color-functions"],
        },
      },
    },
    server: {
      hmr: true,
    },
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "./src"),
      },
    },
    build: {
      target: "es6",
      minify: mode === "development" ? false : "terser",
      sourcemap: mode === "development",
      terserOptions: {
        compress: {
          // drop_console: env.VITE_DELETE_CONSOLE === "true",
          drop_debugger: env.VITE_DELETE_CONSOLE === "true",
        },
      },
    },
    optimizeDeps: {
      include: ["lodash-es"],
    },
  })
}
