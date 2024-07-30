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

class UserService {
  signAccessToken(user_Id: string) {
    return signToken({
      payload: { user_Id, tokenType: TokenType.AccessToken },
      options: {
        expiresIn: accessTokenExpireTime
      }
    })
  }

  signRefreshToken(user_Id: string) {
    return signToken({
      payload: { user_Id, tokenType: TokenType.RefreshToken },
      options: {
        expiresIn: refreshTokenExpireTime
      }
    })
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

    const [accessToken, refreshToken] = await Promise.all([
      userService.signAccessToken(user_id),
      userService.signRefreshToken(user_id)
    ])

    return {
      accessToken,
      refreshToken
    }
  }

  async checkEmailExists(email: string, { message }: { message: any }) {
    try {
      const isExistEmail = await databaseService.users.findOne({ email })

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
    } catch (error) {
      return error
    }
  }
}

export const userService = new UserService()
