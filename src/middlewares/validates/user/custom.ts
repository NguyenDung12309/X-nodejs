import { HTTP_STATUS } from '@/constraints/httpStatus'
import { useI18n } from '@/helpers/i18n'
import { objectToString } from '@/helpers/utils'
import { userService } from '@/services/user'
import { ErrorWithStatus } from '@/types/errors'
import { UserVerifyStatus } from '@/types/type'
import { CustomHelpers } from 'joi'

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
