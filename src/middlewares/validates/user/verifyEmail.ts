import { joi } from '@/helpers/joi'
import { checkUserVerifyEmail } from './custom'
import { reqAuthorization } from '@/models/dto/token/token'
import { getCommonMessageValidate } from '@/helpers/message'

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
