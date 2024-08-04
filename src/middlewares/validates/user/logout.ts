import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqLogout } from '@/models/dto/users/logout'
import { userService } from '@/services/user'

export const logoutValidate = joi.object<reqLogout>({
  refresh_token: joi
    .string()
    .required()
    .trim()
    .external(userService.verifyTRefreshToken)
    .messages(
      getCommonMessageValidate<reqLogout>({
        field: 'refresh_token'
      })
    )
})
