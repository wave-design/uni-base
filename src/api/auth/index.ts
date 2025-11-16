import type { CaptchaParams, CaptchaResponse, LoginParams, LoginResponse, RefreshTokenParams, RefreshTokenResponse, RegisterParams, RegisterResponse } from './interface'
import { Http } from '@/http/core'

/**
 * 用户登录接口。
 *
 * @param data - 登录参数，包含用户名、密码、验证码等信息。
 * @returns 返回登录结果。
 */
export function login(data: LoginParams) {
  return Http.Post<LoginResponse>('/admin/auth/login', data)
}

/**
 * 用户注册接口。
 *
 * @param data - 注册参数，包含用户名、密码、确认密码、验证码等信息。
 * @returns 返回注册结果。
 */
export function register(data: RegisterParams) {
  return Http.Post<RegisterResponse>('/admin/auth/register', data)
}

/**
 * 获取验证码接口。
 *
 * @param data - 验证码参数，包含类型、宽度、高度等配置信息。
 * @returns 返回验证码数据。
 */
export function captcha(data: CaptchaParams) {
  return Http.Post<CaptchaResponse>('/admin/auth/captcha', data)
}

/**
 * 刷新token接口。
 *
 * @param data - 刷新token参数，包含刷新token。
 * @returns 返回刷新token结果。
 */
export function refreshToken(data: RefreshTokenParams) {
  const method = Http.Post<RefreshTokenResponse>('/admin/auth/refreshToken', data)
  method.meta = { authRole: 'refreshToken' }
  return method
}
