import { handleResponseSuccess } from '@/helpers/handler'
import { reqVerifyForgotPasswordToken, resToken } from '@/models/dto/token/token'
import { reqForgotPassword, resForgotPassword } from '@/models/dto/users/forgotPassword'
import { UserSchema } from '@/models/schemas/user'
import { tokenService } from '@/services/token'
import { userService } from '@/services/user'
import { Controller, UserVerifyStatus } from '@/types/type'
import { ObjectId } from 'mongodb'

export const forgotPasswordController: Controller<reqForgotPassword> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema
  const token = await tokenService.signForgotPasswordToken({
    user_id: userInfo._id as ObjectId,
    verify: userInfo.verify as UserVerifyStatus
  })

  await userService.updateUser({
    forgot_password_token: token
  })

  return handleResponseSuccess<resForgotPassword>(res, {
    data: {
      forgot_password_token: token
    }
  })
}

export const verifyForgotPasswordTokenController: Controller<reqVerifyForgotPasswordToken> = async (req, res) => {
  return handleResponseSuccess<resToken>(res)
}
