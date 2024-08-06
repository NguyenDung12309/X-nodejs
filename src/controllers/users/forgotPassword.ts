import { handleResponseSuccess } from '@/helpers/handler'
import { reqForgotPassword, resForgotPassword } from '@/models/dto/users/forgotPassword'
import { reqVerifyForgotPasswordToken, resToken } from '@/models/dto/users/token'
import { UserSchema } from '@/models/schemas/user'
import { databaseService } from '@/services/db'
import { userService } from '@/services/user'
import { Controller, UserVerifyStatus } from '@/types/type'
import { ObjectId } from 'mongodb'

export const forgotPasswordController: Controller<reqForgotPassword> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema
  const token = await userService.signForgotPasswordToken({
    user_id: userInfo._id as ObjectId,
    verify: userInfo.verify as UserVerifyStatus
  })

  await databaseService.users.updateOne(
    {
      _id: userInfo?._id
    },
    {
      $set: {
        forgot_password_token: token
      },
      $currentDate: {
        updated_at: true
      }
    }
  )

  return handleResponseSuccess<resForgotPassword>(res, {
    data: {
      forgot_password_token: token
    }
  })
}

export const verifyForgotPasswordTokenController: Controller<reqVerifyForgotPasswordToken> = async (req, res) => {
  return handleResponseSuccess<resToken>(res)
}
