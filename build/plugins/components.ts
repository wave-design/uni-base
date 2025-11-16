import components from '@uni-helper/vite-plugin-uni-components'

export default function useComponentsPlugin() {
  return components({
    deep: true,
    extensions: ['vue'],
    directoryAsNamespace: false,
    dts: 'src/types/components.d.ts',
  })
}
