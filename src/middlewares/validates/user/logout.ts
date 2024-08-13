import { joi } from '@/helpers/joi'
import { reqLogout } from '@/models/dto/users/logout'
import { verifyTRefreshToken } from '../token/custom'
import { getCommonMessageValidate } from '@/helpers/message'

export const logoutValidate = joi.object<reqLogout>({
  refresh_token: joi
    .string()
    .required()
    .trim()
    .external(verifyTRefreshToken)
    .messages(
      getCommonMessageValidate<reqLogout>({
        field: 'refresh_token'
      })
    )
})
