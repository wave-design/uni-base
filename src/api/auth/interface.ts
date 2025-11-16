export interface LoginParams {
  username: string
  password: string
  verifyCode: string
  captchaId: string
}

export interface LoginResponse {
  [key: string]: any
}

export interface RegisterParams {
  username: string
  password: string
  confirmPassword: string
  verifyCode: string
  captchaId: string
}

export interface RegisterResponse {
  [key: string]: any
}

export interface CaptchaParams {
  type: 'login' | 'register'
  width?: number
  height?: number
}

export interface CaptchaResponse {
  id: string
  imageBase64: string
}

export interface RefreshTokenParams {
  refreshToken: string
}

export interface RefreshTokenResponse extends LoginResponse {}
