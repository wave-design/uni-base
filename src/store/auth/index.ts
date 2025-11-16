import type { AuthState } from './interface'
import { login, refreshToken } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: '',
    expire: 0,
    refreshToken: '',
    refreshExpire: 0,
  }),
  actions: {
    init() {},
    async login(data: any) {
      const res = await login(data)
      this.token = res.token
      this.expire = Date.now() + res.expire * 1000
      this.refreshToken = res.refreshToken
      this.refreshExpire = Date.now() + res.refreshExpire * 1000

      return res
    },
    async logout() {
      this.token = ''
      this.expire = 0
      this.refreshToken = ''
      this.refreshExpire = 0
    },
    // 是否过期
    isExpired(type: 'token' | 'refreshToken') {
      const expire = type === 'token' ? this.expire : this.refreshExpire
      return expire - Date.now() <= 3000
    },
    // 刷新token
    async refreshTokenState(token?: string) {
      const res = await refreshToken({ refreshToken: token || this.refreshToken })
      this.token = res.token
      this.expire = Date.now() + res.expire * 1000
      this.refreshToken = res.refreshToken
      this.refreshExpire = Date.now() + res.refreshExpire * 1000
    },
  },
  persist: {
    key: 'auth',
    paths: ['token', 'expire', 'refreshToken', 'refreshExpire'],
    storage: localStorage,
  },
})
