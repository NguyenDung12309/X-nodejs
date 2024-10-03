import { HTTP_STATUS } from '@/constraints/httpStatus'
import { useI18n } from '@/helpers/i18n'
import { objectToString } from '@/helpers/utils'
import { userService } from '@/services/user'
import { ErrorWithStatus } from '@/types/errors'
import { UserVerifyStatus } from '@/types/type'
import { CustomHelpers } from 'joi'
import { ObjectId } from 'mongodb'

export const checkUserVerifyEmail = async (token: string, helper: CustomHelpers) => {
  if (userService.userInfo?.verify !== UserVerifyStatus.unverified) {
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

export const checkUserNameExist = async (username: string, helper: CustomHelpers) => {
  if (userService.userInfo?.username === username) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.exist', { field: 'username' }),
          statusCode: HTTP_STATUS.CONFLICT
        })
      )
    })

    return externalMessage
  }

  return username
}

export const checkUserNameNotExist = async (username: string, helper: CustomHelpers) => {
  const result = await userService.findMeInfo({ username: username }, true)

  if (!result) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.notExist', { field: 'username' }),
          statusCode: HTTP_STATUS.NOT_FOUND
        })
      )
    })

    return externalMessage
  }

  return username
}

export const checkUserCircleExist = async (userId: string, helper: CustomHelpers) => {
  const result = await userService.findUserInfo({ _id: new ObjectId(userId) }, true)

  if (!result) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.notExist', { field: 'user_id' }),
          statusCode: HTTP_STATUS.NOT_FOUND
        })
      )
    })

    return externalMessage
  }

  return userId
}
