import viteRestart from 'vite-plugin-restart'

export default function useViteRestartPlugin() {
  return viteRestart({
    restart: ['vite.config.js'],
  })
}
