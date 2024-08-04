import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqVerifyEmail } from '@/models/dto/users/token'
import { userService } from '@/services/user'

export const verifyEmailValidate = joi.object<reqVerifyEmail>({
  email_verify_token: joi
    .string()
    .required()
    .trim()
    .external(userService.verifyEmailToken)
    .messages(
      getCommonMessageValidate<reqVerifyEmail>({
        field: 'email_verify_token'
      })
    )
})
