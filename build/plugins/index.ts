import uni from '@dcloudio/vite-plugin-uni';
import unocss from 'unocss/vite';
import uniPages from '@uni-helper/vite-plugin-uni-pages';
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import uniPlatform from '@uni-helper/vite-plugin-uni-platform';
import uniManifest from '@uni-helper/vite-plugin-uni-manifest';

import createFix from './fix';
import createHtml from './html';
import createTransform from './transform';
import createVisualizer from './visualizer';
import createAutoImport from './auto-import';
import createComponents from './components';
import createCompression from './compression';

export default function createVitePlugins(env: Record<string, string>) {
  const vitePlugins: any[] = [
    uniLayouts(),
    uniPlatform(),
    uniManifest(),
    uniPages({
      exclude: ['**/components/**/**.*'],
      subPackages: [],
      dts: 'src/types/uni-pages.d.ts',
    }),
    uni(),
    unocss(),
  ];
  // vitePlugins.push(createFix());
  vitePlugins.push(createHtml());
  vitePlugins.push(createComponents());
  vitePlugins.push(createVisualizer());
  vitePlugins.push(createTransform());
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createCompression());
  return vitePlugins;
}
