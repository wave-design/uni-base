export interface AuthState {
  token: string
  expire: number
  refreshToken: string
  refreshExpire: number
  [key: string]: any
}
