import { joi } from '@/helpers/joi'
import { verifyForgotPasswordToken } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqForgotPasswordToken } from '@/models/dto/token/token'

export const forgotPasswordTokenValidate = joi.object<ReqForgotPasswordToken>({
  forgot_password_token: joi
    .string()
    .required()
    .trim()
    .external(verifyForgotPasswordToken)
    .messages(
      getCommonMessageValidate<ReqForgotPasswordToken>({
        field: 'forgot_password_token'
      })
    )
})
