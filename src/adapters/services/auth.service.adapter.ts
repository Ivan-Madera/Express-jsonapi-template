import { sign } from 'jsonwebtoken'
import env from '../../config/callEnv'
import { type AuthServicePort } from '../../domain/ports/user.ports'

export const createAuthServiceAdapter = (): AuthServicePort => ({
  generateToken: (uid: string): string => {
    const secret = env.SECRET_KEY
    return sign({ uid }, secret, { expiresIn: '1h' })
  }
})
