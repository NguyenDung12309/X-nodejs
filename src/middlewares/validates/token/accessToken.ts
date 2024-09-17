import { joi } from '@/helpers/joi'
import { ReqAuthorization } from '@/models/dto/token/token'
import { verifyAccessToken } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'

export const accessTokenValidate = joi.object<ReqAuthorization>({
  authorization: joi
    .string()
    .required()
    .trim()
    .external(verifyAccessToken)
    .messages(
      getCommonMessageValidate<ReqAuthorization>({
        field: 'authorization'
      })
    )
})
