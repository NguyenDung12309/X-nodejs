import { useI18n } from '@/helpers/i18n'
import { databaseService } from './db.js'
import { UserSchema } from '@/models/schemas/user.js'
import { __ } from 'i18n'
import { sha256 } from '@/helpers/crypto.js'
import { signToken, verifyToken } from '@/helpers/jwt.js'
import { TokenType, UserVerifyStatus } from '@/types/type.js'
import { accessTokenExpireTime, emailExpireTime, refreshTokenExpireTime } from '@/constraints/database.js'
import { objectToString } from '@/helpers/utils.js'
import { HTTP_STATUS } from '@/constraints/httpStatus.js'
import { ErrorWithStatus } from '@/types/errors.js'
import { CustomHelpers } from 'joi'
import { RefreshTokenSchema } from '@/models/schemas/refreshToken.js'
import { ObjectId } from 'mongodb'
import { reqRegister } from '@/models/dto/users/register.js'
import { resToken } from '@/models/dto/users/token.js'
import { ENV_CONST } from '@/constraints/common.js'

class UserService {
  userInfo: UserSchema | undefined
  refreshTokenInfo: RefreshTokenSchema | undefined

  constructor() {
    this.verifyTRefreshToken = this.verifyTRefreshToken.bind(this)
    this.checkEmailExists = this.checkEmailExists.bind(this)
    this.checkEmailPasswordExists = this.checkEmailPasswordExists.bind(this)
    this.verifyEmailToken = this.verifyEmailToken.bind(this)
  }

  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, tokenType: TokenType.AccessToken },
      privateKey: ENV_CONST.accessKey || '',
      options: {
        expiresIn: accessTokenExpireTime
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, tokenType: TokenType.RefreshToken },
      privateKey: ENV_CONST.refreshKey || '',
      options: {
        expiresIn: refreshTokenExpireTime
      }
    })
  }

  private signEmailVerifyToken(user_id: string) {
    return signToken({
      payload: { user_id, tokenType: TokenType.EmailVerifyToken },
      privateKey: ENV_CONST.verifyEmailKey || '',
      options: {
        expiresIn: emailExpireTime
      }
    })
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([userService.signAccessToken(user_id), userService.signRefreshToken(user_id)])
  }

  async createUser(payload: reqRegister): Promise<resToken> {
    const userId = new ObjectId().toString()
    const token = await this.signEmailVerifyToken(userId)

    const result = await databaseService.users.insertOne(
      new UserSchema({
        ...payload,
        _id: new ObjectId(userId),
        date_of_birth: new Date(payload.date_of_birth),
        password: sha256(payload.password),
        email_verify_token: token,
        verify: UserVerifyStatus.unverified
      })
    )

    const user_id = result.insertedId.toString()

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)

    return {
      access_token,
      refresh_token
    }
  }

  async findUser(data: Partial<UserSchema>) {
    const result = await databaseService.users.findOne(data)

    if (result) {
      this.userInfo = result
    }

    return result
  }

  async getAccessAndRefreshToken(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)

    databaseService.refreshToken.insertOne(
      new RefreshTokenSchema({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )

    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExists(email: string, { message }: CustomHelpers) {
    const isExistEmail = await this.findUser({ email })

    if (isExistEmail) {
      const externalMessage = message({
        external: objectToString(
          new ErrorWithStatus({
            message: useI18n.__('validate.common.exist', { field: 'email' }),
            statusCode: HTTP_STATUS.CONFLICT
          })
        )
      })

      return externalMessage
    }

    return email
  }

  async checkEmailPasswordExists(password: string, helper: CustomHelpers) {
    const { email } = helper.state.ancestors[0]

    const userInfo = await this.findUser({ email, password: sha256(password) })

    if (!userInfo) {
      const externalMessage = helper.message({
        external: objectToString(
          new ErrorWithStatus({
            message: useI18n.__('validate.common.notCorrect', { field: 'email hoặc password' }),
            statusCode: HTTP_STATUS.UNAUTHORIZED
          })
        )
      })

      return externalMessage
    }

    return password
  }

  async verifyTRefreshToken(token: string, helper: CustomHelpers) {
    const [decode, result] = await Promise.all([
      verifyToken<RefreshTokenSchema>({ token: token, privateKey: ENV_CONST.refreshKey || '' }),
      databaseService.refreshToken.findOne({ token: token.split(' ')[1] })
    ])

    if (!result || !decode) {
      const externalMessage = helper.message({
        external: objectToString(
          new ErrorWithStatus({
            message: useI18n.__('validate.common.invalid', { field: 'token' }),
            statusCode: HTTP_STATUS.UNAUTHORIZED
          })
        )
      })

      return externalMessage
    }

    this.refreshTokenInfo = result

    return token
  }

  async verifyEmailToken(token: string, helper: CustomHelpers) {
    const decode = await verifyToken<RefreshTokenSchema>({ token: token, privateKey: ENV_CONST.verifyEmailKey || '' })
    const result = await this.findUser({ _id: new ObjectId(decode.user_id) })

    if (!result || !decode) {
      const externalMessage = helper.message({
        external: objectToString(
          new ErrorWithStatus({
            message: useI18n.__('validate.common.invalid', { field: 'token' }),
            statusCode: HTTP_STATUS.UNAUTHORIZED
          })
        )
      })

      return externalMessage
    }

    if (result && !result.email_verify_token) {
      const externalMessage = helper.message({
        external: objectToString(
          new ErrorWithStatus({
            message: useI18n.__('validate.common.emailVerify'),
            statusCode: HTTP_STATUS.BAD_REQUEST
          })
        )
      })

      return externalMessage
    }

    this.userInfo = result

    return token
  }

  resetUserInfo() {
    this.userInfo = undefined
  }

  resetRefreshToken() {
    this.refreshTokenInfo = undefined
  }
}

export const userService = new UserService()
