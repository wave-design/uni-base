import components from '@uni-helper/vite-plugin-uni-components';

export default function createComponents() {
  return components({
    extensions: ['vue'],
    deep: true, // 是否递归扫描子目录，
    directoryAsNamespace: false, // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
    dts: 'src/types/components.d.ts', // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
  });
}
