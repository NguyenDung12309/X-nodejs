import { HTTP_STATUS } from '@/constraints/httpStatus'
import { handleResponseSuccess } from '@/helpers/handler'
import { useI18n } from '@/helpers/i18n'
import { reqAccessToken, resToken } from '@/models/dto/users/token'
import { databaseService } from '@/services/db'
import { userService } from '@/services/user'
import { ErrorWithStatus } from '@/types/errors'
import { Controller } from '@/types/type'

export const getNewAccessTokenController: Controller<reqAccessToken> = async (req, res) => {
  const user_id = userService.refreshTokenInfo?.user_id

  if (!user_id) {
    throw new ErrorWithStatus({
      message: useI18n.__('validate.common.notCorrect', { field: 'user_id' }),
      statusCode: HTTP_STATUS.UNAUTHORIZED
    })
  }
  const token = req.body.refresh_token.split(' ')[1]

  const [_, result] = await Promise.all([
    databaseService.refreshToken.deleteOne({ token }),
    userService.getAccessAndRefreshToken(user_id.toString())
  ])

  return handleResponseSuccess<resToken>(res, {
    data: result
  })
}
