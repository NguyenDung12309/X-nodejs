import { useI18n } from '@/helpers/i18n'
import { databaseService } from './db.js'
import { UserSchema } from '@/models/schemas/user.js'
import { reqRegister } from '@/models/dto/register.js'
import { __ } from 'i18n'
import { sha256 } from '@/helpers/crypto.js'
import { signToken } from '@/helpers/jwt.js'
import { TokenType } from '@/types/type.js'
import { accessTokenExpireTime, refreshTokenExpireTime } from '@/constraints/database.js'
import { objectToString } from '@/helpers/utils.js'
import { HTTP_STATUS } from '@/constraints/httpStatus.js'
import { ErrorWithStatus } from '@/types/errors.js'
import { CustomHelpers } from 'joi'

class UserService {
  constructor() {
    this.checkEmailExists = this.checkEmailExists.bind(this)
  }

  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, tokenType: TokenType.AccessToken },
      options: {
        expiresIn: accessTokenExpireTime
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, tokenType: TokenType.RefreshToken },
      options: {
        expiresIn: refreshTokenExpireTime
      }
    })
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([userService.signAccessToken(user_id), userService.signRefreshToken(user_id)])
  }

  async createUser(payload: reqRegister) {
    const result = await databaseService.users.insertOne(
      new UserSchema({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: sha256(payload.password)
      })
    )

    const user_id = result.insertedId.toString()

    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)

    return {
      accessToken,
      refreshToken
    }
  }

  findEmail(email: string) {
    return databaseService.users.findOne({ email })
  }

  async login(user_id: string) {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)

    return {
      accessToken,
      refreshToken
    }
  }

  async checkEmailExists(email: string, { message }: CustomHelpers) {
    try {
      const isExistEmail = await this.findEmail(email)

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

      return true
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async checkPasswordExists(password: string, helper: CustomHelpers) {
    try {
      const { email } = helper.state.ancestors[0]

      await this.checkEmailExists(email, helper)

      return true
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export const userService = new UserService()
