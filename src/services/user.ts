import { databaseService } from './db.js'
import { UserSchema } from '@/models/schemas/user.js'
import { __ } from 'i18n'
import { sha256 } from '@/helpers/crypto.js'
import { UserVerifyStatus } from '@/types/type.js'

import { Document, ObjectId } from 'mongodb'
import { reqRegister } from '@/models/dto/auth/register.js'
import { tokenService } from './token.js'
import { omit } from 'lodash'
import { UserDto } from '@/models/dto/users/me.js'
import { ErrorWithStatus } from '@/types/errors.js'
import { useI18n } from '@/helpers/i18n.js'
import { HTTP_STATUS } from '@/constraints/httpStatus.js'

class UserService {
  userInfo: UserDto | undefined

  findUser = async (data: Partial<UserSchema>, noError?: boolean) => {
    const result = await databaseService.users.findOne(data)
    const omitResult = omit(result, ['email_verify_token', 'password', 'forgot_password_token'])

    if (!result && !noError) {
      this.resetUserInfo()

      throw new ErrorWithStatus({
        message: useI18n.__('validate.common.notExist', { field: 'username' }),
        statusCode: HTTP_STATUS.NOT_FOUND
      })
    }

    this.userInfo = omitResult

    return result
  }

  createUser = async (payload: reqRegister) => {
    const userId = new ObjectId()
    const verify = UserVerifyStatus.unverified
    const token = await tokenService.signEmailVerifyToken({ user_id: userId, verify })

    await databaseService.users.insertOne(
      new UserSchema({
        ...payload,
        _id: userId,
        username: `user${userId.toString()}`,
        date_of_birth: new Date(payload.date_of_birth),
        password: sha256(payload.password),
        email_verify_token: token,
        verify
      })
    )

    return tokenService.createAccessAndRefreshToken({ user_id: userId, verify })
  }

  updateUser = (data: Partial<UserSchema>) => {
    return databaseService.users.updateOne(
      {
        _id: this.userInfo?._id
      },
      {
        $set: data,
        $currentDate: {
          updated_at: true
        }
      }
    )
  }

  updateUserWithProjection = (data: Partial<UserSchema>, projection?: Document) => {
    if (!projection) {
      projection = {
        password: 0,
        email_verify_token: 0,
        forgot_password_token: 0
      }
    }

    return databaseService.users.findOneAndUpdate(
      {
        _id: this.userInfo?._id
      },
      {
        $set: data,
        $currentDate: {
          updated_at: true
        }
      },
      {
        returnDocument: 'after',
        projection: projection
      }
    )
  }

  resetUserInfo = () => {
    this.userInfo = undefined
  }
}

export const userService = new UserService()
