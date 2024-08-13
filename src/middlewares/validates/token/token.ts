import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqLogout } from '@/models/dto/users/logout'
import { verifyAccessToken, verifyTRefreshToken } from './custom'
import { reqAccessToken, reqAuthorization } from '@/models/dto/token/token'

export const refreshTokenValidate = joi.object<reqLogout>({
  refresh_token: joi
    .string()
    .required()
    .trim()
    .external(verifyTRefreshToken)
    .messages(
      getCommonMessageValidate<reqAccessToken>({
        field: 'refresh_token'
      })
    )
})

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
