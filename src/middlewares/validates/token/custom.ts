import { ENV_CONST } from '@/constraints/common'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { useI18n } from '@/helpers/i18n'
import { verifyToken } from '@/helpers/jwt'
import { objectToString } from '@/helpers/utils'
import { RefreshTokenSchema } from '@/models/schemas/refreshToken'
import { tokenService } from '@/services/token'
import { userService } from '@/services/user'
import { ErrorWithStatus } from '@/types/errors'
import { CustomHelpers } from 'joi'
import { ObjectId } from 'mongodb'

export const verifyTRefreshToken = async (token: string, helper: CustomHelpers) => {
  const [decode, result] = await Promise.all([
    verifyToken<RefreshTokenSchema>({ token: token, privateKey: ENV_CONST.refreshKey ?? '' }),
    tokenService.findRefreshToken({ token: token }, true)
  ])

  if (!result || !decode) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.invalid', { field: 'refresh_token' }),
          statusCode: HTTP_STATUS.UNAUTHORIZED
        })
      )
    })

    return externalMessage
  }

  return token
}

export const verifyEmailToken = async (token: string, helper: CustomHelpers) => {
  const decode = await verifyToken<RefreshTokenSchema>({ token: token, privateKey: ENV_CONST.verifyEmailKey ?? '' })
  const result = await userService.findMeInfo({ _id: new ObjectId(decode.user_id) }, true)

  if (!result || !decode) {
    return helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.invalid', { field: 'token' }),
          statusCode: HTTP_STATUS.UNAUTHORIZED
        })
      )
    })
  }

  if (result && !result.email_verify_token) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.emailVerify'),
          statusCode: HTTP_STATUS.BAD_REQUEST
        })
      )
    })

    return externalMessage
  }

  return token
}

export const verifyAccessToken = async (token: string, helper: CustomHelpers) => {
  const decode = await verifyToken<RefreshTokenSchema>({ token: token, privateKey: ENV_CONST.accessKey ?? '' })
  const result = await userService.findMeInfo({ _id: new ObjectId(decode.user_id) }, true)

  if (!result || !decode) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.invalid', { field: 'token' }),
          statusCode: HTTP_STATUS.UNAUTHORIZED
        })
      )
    })

    return externalMessage
  }

  return token
}

export const verifyForgotPasswordToken = async (token: string, helper: CustomHelpers) => {
  const decode = await verifyToken<RefreshTokenSchema>({
    token: token,
    privateKey: ENV_CONST.forgotPasswordKey ?? ''
  })
  const result = await userService.findMeInfo({ _id: new ObjectId(decode.user_id) }, true)

  if (!result || result.forgot_password_token !== token) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.invalid', { field: 'token' }),
          statusCode: HTTP_STATUS.UNAUTHORIZED
        })
      )
    })

    return externalMessage
  }

  return token
}
