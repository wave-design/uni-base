import type { uniappRequestAdapter } from '@alova/adapter-uniapp'
import type { VueHookType } from 'alova/vue'
import uniappAdapter from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import statesHook from 'alova/vue'
import { useAuthStore } from '@/store/auth'

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<VueHookType, typeof uniappRequestAdapter>({
  assignToken: (method) => {
    method.config.headers.Authorization = 'token'
  },
  refreshTokenOnError: {
    isExpired: (error, method) => {
      return error.response.status === 401 && !method.meta?.isExpired
    },
    handler: async () => {
      const auth = useAuthStore()
      if (auth.isExpired('refreshToken')) {
        throw new Error('登录状态已过期，请重新登录')
      }
      else {
        try {
          await auth.refreshTokenState()
        }
        catch (error) {
          auth.logout()
          setTimeout(() => {
            window.location.replace('/login')
          }, 2000)
          throw error
        }
      }
    },
  },
  refreshTokenOnSuccess: {
    isExpired: (response, method) => {
      return response.statusCode === 401 && !method.meta?.isExpired
    },
    handler: async () => {
      const auth = useAuthStore()
      if (auth.isExpired('refreshToken')) {
        throw new Error('登录状态已过期，请重新登录')
      }
      else {
        try {
          await auth.refreshTokenState()
        }
        catch (error) {
          auth.logout()
          setTimeout(() => {
            window.location.replace('/login')
          }, 2000)
          throw error
        }
      }
    },
  },
})

const Http = createAlova({
  baseURL: import.meta.env.VITE_API_PREFIX ?? import.meta.env.VITE_HTTP_BASEURL,
  ...uniappAdapter(),
  timeout: 30 * 1000,
  statesHook,
  beforeRequest: onAuthRequired(() => {
  }),
  responded: onResponseRefreshToken((response, method) => {
    const { config } = method
    const { requestType } = config
    const { statusCode, data: rawData, errMsg } = response as UniNamespace.RequestSuccessCallbackResult

    // 处理特殊请求类型（上传/下载）
    if (requestType === 'upload' || requestType === 'download') {
      return response
    }

    // 处理 HTTP 状态码错误
    if (statusCode !== 200) {
      const status = {
        400: `${statusCode} 请求出现语法错误`,
        401: `${statusCode} 用户未授权`,
        403: `${statusCode} 服务器拒绝访问`,
        404: `${statusCode} 请求的资源不存在`,
        405: `${statusCode} 请求方法未允许`,
        408: `${statusCode} 网络请求超时`,
        500: `${statusCode} 服务器内部错误`,
        501: `${statusCode} 服务器未实现请求功能`,
        502: `${statusCode} 错误网关`,
        503: `${statusCode} 服务不可用`,
        504: `${statusCode} 网关超时`,
        505: `${statusCode} http版本不支持该请求`,
        default: `${statusCode} 请求错误`,
      } as any
      uni.showToast({ title: status[statusCode] || status.default, icon: 'error' })
      throw new Error(status[statusCode] || status.default)
    }

    const { code, data, message } = rawData as any
    // 0和200当做成功都很普遍，这里直接兼容两者，见 ResultEnum
    if (code === 0) {
      return data
    }
    else {
      throw new Error(`请求错误[${code}]：${message}`)
    }
  }),
})

export { Http }
