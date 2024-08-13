import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { verifyEmailToken } from '../token/custom'
import { checkUserVerifyEmail } from './custom'
import { reqAuthorization, reqVerifyEmail } from '@/models/dto/token/token'

export const verifyEmailValidate = joi.object<reqVerifyEmail>({
  email_verify_token: joi
    .string()
    .required()
    .trim()
    .external(verifyEmailToken)
    .messages(
      getCommonMessageValidate<reqVerifyEmail>({
        field: 'email_verify_token'
      })
    )
})

export const resendVerifyEmailValidate = joi.object<reqAuthorization>({
  authorization: joi
    .string()
    .external(checkUserVerifyEmail)
    .messages(
      getCommonMessageValidate<reqAuthorization>({
        field: 'authorization'
      })
    )
})
