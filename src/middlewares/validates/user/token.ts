import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqLogout } from '@/models/dto/users/logout'
import { reqAccessToken, reqResendMailToken } from '@/models/dto/users/token'
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

export const accessTokenValidate = joi.object<reqResendMailToken>({
  authorization: joi
    .string()
    .required()
    .trim()
    .external(userService.checkUserVerifyEmail)
    .messages(
      getCommonMessageValidate<reqResendMailToken>({
        field: 'authorization'
      })
    )
})
