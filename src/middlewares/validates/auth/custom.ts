import { HTTP_STATUS } from '@/constraints/httpStatus'
import { sha256 } from '@/helpers/crypto'
import { useI18n } from '@/helpers/i18n'
import { objectToString } from '@/helpers/utils'
import { userService } from '@/services/user'
import { ErrorWithStatus } from '@/types/errors'
import { CustomHelpers } from 'joi'

export const checkEmailNotExists = async (email: string, helper: CustomHelpers) => {
  const isExistEmail = await userService.findUser({ email })

  if (!isExistEmail) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.notExist', { field: 'email' }),
          statusCode: HTTP_STATUS.BAD_REQUEST
        })
      )
    })

    return externalMessage
  }

  return email
}

export const checkEmailPasswordExists = async (password: string, helper: CustomHelpers) => {
  const { email } = helper.state.ancestors[0]

  const userInfo = await userService.findUser({ email, password: sha256(password) })

  if (!userInfo) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.notCorrect', { field: 'email hoặc password' }),
          statusCode: HTTP_STATUS.UNAUTHORIZED
        })
      )
    })

    return externalMessage
  }

  return password
}

export const checkEmailExists = async (email: string, { message }: CustomHelpers) => {
  const isExistEmail = await userService.findUser({ email }, true)

  if (isExistEmail) {
    const externalMessage = message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.exist', { field: 'email' }),
          statusCode: HTTP_STATUS.CONFLICT
        })
      )
    })

    return externalMessage
  }

  return email
}
