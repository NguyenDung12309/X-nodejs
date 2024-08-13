import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqLogout } from '@/models/dto/users/logout'
import { verifyTRefreshToken } from '../token/custom'

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
