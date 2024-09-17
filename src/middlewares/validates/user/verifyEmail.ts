import { joi } from '@/helpers/joi'
import { checkUserVerifyEmail } from './custom'
import { ReqAuthorization } from '@/models/dto/token/token'
import { getCommonMessageValidate } from '@/helpers/message'

export const resendVerifyEmailValidate = joi.object<ReqAuthorization>({
  authorization: joi
    .string()
    .external(checkUserVerifyEmail)
    .messages(
      getCommonMessageValidate<ReqAuthorization>({
        field: 'authorization'
      })
    )
})
