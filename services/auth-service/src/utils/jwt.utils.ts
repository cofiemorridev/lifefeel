import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
const JWT_EXPIRES_IN = '7d'
const REFRESH_TOKEN_EXPIRES_IN = '30d'

export interface TokenPayload {
  userId: string
  email: string
  role: string
}

export const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  const refreshToken = jwt.sign({ userId: payload.userId }, JWT_SECRET + 'refresh', { 
    expiresIn: REFRESH_TOKEN_EXPIRES_IN 
  })
  
  return {
    accessToken,
    refreshToken,
    expiresIn: 7 * 24 * 60 * 60 // 7 days in seconds
  }
}

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch (error) {
    return null
  }
}

export const verifyRefreshToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET + 'refresh') as { userId: string }
  } catch (error) {
    return null
  }
}
