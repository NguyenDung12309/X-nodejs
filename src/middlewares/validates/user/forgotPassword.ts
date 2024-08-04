import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqVerifyForgotPasswordToken } from '@/models/dto/users/token'
import { userService } from '@/services/user'

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
