import uniKuRoot from '@uni-ku/root'

export default function useUniKuRootPlugin() {
  return uniKuRoot({
    excludePages: ['**/components/**/**.*'],
  })
}
