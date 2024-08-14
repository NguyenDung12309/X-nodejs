import { joi } from '@/helpers/joi'
import { verifyEmailToken } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'
import { reqVerifyEmailToken } from '@/models/dto/token/token'

export const verifyEmailValidate = joi.object<reqVerifyEmailToken>({
  email_verify_token: joi
    .string()
    .required()
    .trim()
    .external(verifyEmailToken)
    .messages(
      getCommonMessageValidate<reqVerifyEmailToken>({
        field: 'email_verify_token'
      })
    )
})
