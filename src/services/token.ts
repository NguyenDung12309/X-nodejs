import { ENV_CONST } from '@/constraints/common'
import {
  accessTokenExpireTime,
  emailExpireTime,
  forgotPasswordExpireTime,
  refreshTokenExpireTime
} from '@/constraints/database'
import { signToken } from '@/helpers/jwt'
import { RefreshTokenSchema } from '@/models/schemas/refreshToken'
import { TokenType } from '@/types/type'
import { databaseService } from './db'

interface ITokenProps extends Pick<RefreshTokenSchema, 'verify' | 'user_id'> {}

export class TokenService {
  refreshTokenInfo: RefreshTokenSchema | undefined

  signAccessToken = ({ user_id, verify }: ITokenProps) => {
    return signToken({
      payload: { user_id, verify, tokenType: TokenType.AccessToken },
      privateKey: ENV_CONST.accessKey || '',
      options: { expiresIn: accessTokenExpireTime }
    })
  }

  signRefreshToken = ({ user_id, verify }: ITokenProps) => {
    return signToken({
      payload: { user_id, verify, tokenType: TokenType.RefreshToken },
      privateKey: ENV_CONST.refreshKey || '',
      options: { expiresIn: refreshTokenExpireTime }
    })
  }

  signEmailVerifyToken = ({ user_id, verify }: ITokenProps) => {
    return signToken({
      payload: { user_id, verify, tokenType: TokenType.EmailVerifyToken },
      privateKey: ENV_CONST.verifyEmailKey || '',
      options: { expiresIn: emailExpireTime }
    })
  }

  signAccessAndRefreshToken = (data: ITokenProps) => {
    return Promise.all([this.signAccessToken(data), this.signRefreshToken(data)])
  }

  signForgotPasswordToken = ({ user_id, verify }: ITokenProps) => {
    return signToken({
      payload: { user_id, verify, tokenType: TokenType.ForgotPasswordToken },
      privateKey: ENV_CONST.forgotPasswordKey || '',
      options: { expiresIn: forgotPasswordExpireTime }
    })
  }

  createAccessAndRefreshToken = async (data: ITokenProps) => {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(data)

    await databaseService.refreshToken.insertOne(
      new RefreshTokenSchema({
        token: refreshToken,
        verify: data.verify,
        user_id: data.user_id
      })
    )

    return { accessToken, refreshToken }
  }

  findRefreshToken = async (data: Partial<RefreshTokenSchema>) => {
    const result = await databaseService.refreshToken.findOne(data)

    if (result) this.refreshTokenInfo = result

    return result
  }

  resetRefreshToken = () => {
    this.refreshTokenInfo = undefined
  }
}

export const tokenService = new TokenService()
