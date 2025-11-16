import uniPages from '@uni-helper/vite-plugin-uni-pages'

export default function useUniPagesPlugin() {
  return uniPages({
    exclude: ['**/components/**/**.*'],
    subPackages: [],
    dts: 'src/types/uni-pages.d.ts',
  })
}
