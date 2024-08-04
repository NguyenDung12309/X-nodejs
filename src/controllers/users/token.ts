import { HTTP_STATUS } from '@/constraints/httpStatus'
import { handleResponseSuccess } from '@/helpers/handler'
import { useI18n } from '@/helpers/i18n'
import { reqAccessToken, reqVerifyEmail, resToken } from '@/models/dto/users/token'
import { databaseService } from '@/services/db'
import { userService } from '@/services/user'
import { ErrorWithStatus } from '@/types/errors'
import { Controller, UserVerifyStatus } from '@/types/type'

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

export const verifyEmailController: Controller<reqVerifyEmail> = async (req, res) => {
  const userInfo = userService.userInfo

  if (!userInfo || !userInfo._id) {
    throw new ErrorWithStatus({
      message: useI18n.__('validate.common.notCorrect', { field: 'user_id' }),
      statusCode: HTTP_STATUS.UNAUTHORIZED
    })
  }

  const [_, token] = await Promise.all([
    databaseService.users.updateOne(
      {
        _id: userInfo?._id
      },
      {
        $set: {
          email_verify_token: '',
          updated_at: new Date(),
          verify: UserVerifyStatus.verified
        }
      }
    ),
    userService.getAccessAndRefreshToken(userInfo?._id.toString())
  ])

  return handleResponseSuccess<resToken>(res, {
    data: {
      ...token
    }
  })
}
