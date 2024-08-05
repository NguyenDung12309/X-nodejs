import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqForgotPassword } from '@/models/dto/users/forgotPassword'
import { reqVerifyForgotPasswordToken } from '@/models/dto/users/token'
import { userService } from '@/services/user'

export const forgotPasswordValidate = joi.object<reqForgotPassword>({
  email: joi
    .string()
    .email()
    .required()
    .trim()
    .external(userService.checkEmailNotExists)
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
    .external(userService.verifyForgotPasswordToken)
    .messages(
      getCommonMessageValidate<reqVerifyForgotPasswordToken>({
        field: 'forgot_password_token'
      })
    )
})
