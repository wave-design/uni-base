import process from 'node:process'
import useComponentsPlugin from './components'
import useFixVitePluginVue from './fix-vite-plugin-vue'
import useHtmlTransformPlugin from './html-transform'
import useAutoImportPlugin from './import'
import useUniLayoutsPlugin from './layouts'
import useUniManifestPlugin from './manifest'
import useBundleOptimizerPlugin from './optimizer'
import useUniPagesPlugin from './pages'
import useUniPlatformPlugin from './platform'
import useViteRestartPlugin from './restart'
import useUniKuRootPlugin from './root'
import useUniPlugin from './uni'
import useUnoCssPlugin from './unocss'
import useVisualizerPlugin from './visualizer'

export default function createVitePlugins(mode: string, env: Record<string, string>) {
  const UNI_PLATFORM = process.env.UNI_PLATFORM
  const { VITE_APP_TITLE, VITE_COPY_NATIVE_RES_ENABLE } = env

  const plugins: any[] = [
    useUniLayoutsPlugin(),
    useUniPlatformPlugin(),
    useUniManifestPlugin(),
    useUniPagesPlugin(),
    useBundleOptimizerPlugin(),
    useUniKuRootPlugin(),
    useUniPlugin(),
    useFixVitePluginVue(),
    useUnoCssPlugin(),
    useAutoImportPlugin(),
    useViteRestartPlugin(),
    UNI_PLATFORM === 'h5' ? useHtmlTransformPlugin(VITE_APP_TITLE) : null,
    UNI_PLATFORM === 'h5' && mode === 'production' ? useVisualizerPlugin() : null,
    useComponentsPlugin(),
  ]

  return plugins.filter(Boolean)
}
