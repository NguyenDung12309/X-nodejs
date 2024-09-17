import { joi } from '@/helpers/joi'
import { verifyTRefreshToken } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqRefreshToken } from '@/models/dto/token/token'

export const refreshTokenValidate = joi.object<ReqRefreshToken>({
  refresh_token: joi
    .string()
    .required()
    .trim()
    .external(verifyTRefreshToken)
    .messages(
      getCommonMessageValidate<ReqRefreshToken>({
        field: 'refresh_token'
      })
    )
})
