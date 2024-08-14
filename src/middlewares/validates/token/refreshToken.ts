import { joi } from '@/helpers/joi'
import { verifyTRefreshToken } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'
import { reqRefreshToken } from '@/models/dto/token/token'

export const refreshTokenValidate = joi.object<reqRefreshToken>({
  refresh_token: joi
    .string()
    .required()
    .trim()
    .external(verifyTRefreshToken)
    .messages(
      getCommonMessageValidate<reqRefreshToken>({
        field: 'refresh_token'
      })
    )
})
