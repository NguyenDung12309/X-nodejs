import { joi } from '@/helpers/joi'
import { reqAuthorization } from '@/models/dto/token/token'
import { verifyAccessToken } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'

export const accessTokenValidate = joi.object<reqAuthorization>({
  authorization: joi
    .string()
    .required()
    .trim()
    .external(verifyAccessToken)
    .messages(
      getCommonMessageValidate<reqAuthorization>({
        field: 'authorization'
      })
    )
})
