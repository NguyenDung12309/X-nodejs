import { joi } from '@/helpers/joi'
import { verifyEmailToken } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqVerifyEmailToken } from '@/models/dto/token/token'

export const verifyEmailValidate = joi.object<ReqVerifyEmailToken>({
  email_verify_token: joi
    .string()
    .required()
    .trim()
    .external(verifyEmailToken)
    .messages(
      getCommonMessageValidate<ReqVerifyEmailToken>({
        field: 'email_verify_token'
      })
    )
})
