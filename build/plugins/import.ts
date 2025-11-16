import autoImport from 'unplugin-auto-import/vite'

export default function useAutoImportPlugin() {
  return autoImport({
    imports: ['vue', 'pinia', 'uni-app'],
    dts: 'src/types/auto-import.d.ts',
    dirs: ['src/hooks'],
    vueTemplate: true,
  })
}
