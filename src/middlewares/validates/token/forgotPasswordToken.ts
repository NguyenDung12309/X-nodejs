import { joi } from '@/helpers/joi'
import { verifyForgotPasswordToken } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'
import { reqForgotPasswordToken } from '@/models/dto/token/token'

export const forgotPasswordTokenValidate = joi.object<reqForgotPasswordToken>({
  forgot_password_token: joi
    .string()
    .required()
    .trim()
    .external(verifyForgotPasswordToken)
    .messages(
      getCommonMessageValidate<reqForgotPasswordToken>({
        field: 'forgot_password_token'
      })
    )
})
