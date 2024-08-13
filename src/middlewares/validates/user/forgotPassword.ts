import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqForgotPassword } from '@/models/dto/users/forgotPassword'
import { checkEmailNotExists } from './custom'
import { verifyForgotPasswordToken } from '../token/custom'
import { reqVerifyForgotPasswordToken } from '@/models/dto/token/token'

export const forgotPasswordValidate = joi.object<reqForgotPassword>({
  email: joi
    .string()
    .email()
    .required()
    .trim()
    .external(checkEmailNotExists)
    .messages(
      getCommonMessageValidate<reqForgotPassword>({
        field: 'email'
      })
    )
})

export const forgotPasswordTokenValidate = joi.object<reqVerifyForgotPasswordToken>({
  forgot_password_token: joi
    .string()
    .required()
    .trim()
    .external(verifyForgotPasswordToken)
    .messages(
      getCommonMessageValidate<reqVerifyForgotPasswordToken>({
        field: 'forgot_password_token'
      })
    )
})
