import { joi } from '@/helpers/joi'
import { ReqForgotPassword } from '@/models/dto/auth/forgotPassword'
import { getCommonMessageValidate } from '@/helpers/message'
import { checkEmailNotExists } from './custom'

export const forgotPasswordValidate = joi.object<ReqForgotPassword>({
  email: joi
    .string()
    .email()
    .required()
    .trim()
    .external(checkEmailNotExists)
    .messages(
      getCommonMessageValidate<ReqForgotPassword>({
        field: 'email'
      })
    )
})
