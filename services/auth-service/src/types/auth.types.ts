export interface RegisterUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface LoginUserDto {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: string
  createdAt: Date
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}
