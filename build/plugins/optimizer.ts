import optimization from '@uni-ku/bundle-optimizer'

export default function useBundleOptimizerPlugin() {
  return optimization({
    enable: {
      'optimization': true,
      'async-import': true,
      'async-component': true,
    },
    dts: {
      base: 'src/types',
    },
    logger: false,
  })
}
