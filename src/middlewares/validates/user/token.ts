import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqLogout } from '@/models/dto/users/logout'
import { reqAccessToken, reqAuthorization } from '@/models/dto/users/token'
import { userService } from '@/services/user'

export const refreshTokenValidate = joi.object<reqLogout>({
  refresh_token: joi
    .string()
    .required()
    .trim()
    .external(userService.verifyTRefreshToken)
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
    .external(userService.verifyAccessToken)
    .messages(
      getCommonMessageValidate<reqAuthorization>({
        field: 'authorization'
      })
    )
})
