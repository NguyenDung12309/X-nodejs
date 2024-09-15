import { ENV_CONST } from '@/constraints/common'
import {
  accessTokenExpireTime,
  emailExpireTime,
  forgotPasswordExpireTime,
  refreshTokenExpireTime
} from '@/constraints/database'
import { signToken, verifyToken } from '@/helpers/jwt'
import { RefreshTokenSchema } from '@/models/schemas/refreshToken'
import { TokenType } from '@/types/type'
import { databaseService } from './db'
import { ErrorWithStatus } from '@/types/errors'
import { useI18n } from '@/helpers/i18n'
import { HTTP_STATUS } from '@/constraints/httpStatus'

interface ITokenProps extends Pick<RefreshTokenSchema, 'verify' | 'user_id'> {
  exp?: Date | number
  iat?: Date | number
}

export class TokenService {
  refreshTokenInfo: RefreshTokenSchema | undefined

  signAccessToken = ({ user_id, verify }: ITokenProps) => {
    return signToken({
      payload: { user_id, verify, tokenType: TokenType.AccessToken },
      privateKey: ENV_CONST.accessKey || '',
      options: { expiresIn: accessTokenExpireTime }
    })
  }

  signRefreshToken = ({ user_id, verify, ...prop }: ITokenProps) => {
    if (prop.exp || prop.iat) {
      return signToken({
        payload: { user_id, verify, tokenType: TokenType.RefreshToken, ...prop },
        privateKey: ENV_CONST.refreshKey || ''
      })
    }

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
    const { exp, iat } = await verifyToken<RefreshTokenSchema>({
      token: refreshToken,
      privateKey: ENV_CONST.refreshKey || ''
    })

    await databaseService.refreshToken.insertOne(
      new RefreshTokenSchema({
        token: refreshToken,
        exp,
        iat,
        ...data
      })
    )

    return { accessToken, refreshToken }
  }

  findRefreshToken = async (data: Partial<RefreshTokenSchema>) => {
    const result = await databaseService.refreshToken.findOne(data)

    if (!result) {
      this.resetRefreshToken()

      throw new ErrorWithStatus({
        message: useI18n.__('validate.common.notExist', { field: 'token' }),
        statusCode: HTTP_STATUS.NOT_FOUND
      })
    }

    this.refreshTokenInfo = result

    return result
  }

  resetRefreshToken = () => {
    this.refreshTokenInfo = undefined
  }
}

export const tokenService = new TokenService()
