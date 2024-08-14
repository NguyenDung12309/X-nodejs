import { joi } from '@/helpers/joi'
import { reqForgotPassword } from '@/models/dto/auth/forgotPassword'
import { getCommonMessageValidate } from '@/helpers/message'
import { checkEmailNotExists } from './custom'

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
