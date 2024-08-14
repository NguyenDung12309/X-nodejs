import { HTTP_STATUS } from '@/constraints/httpStatus'
import { ResponseDto } from '@/models/dto'
import { NextFunction, Response } from 'express'
import { useI18n } from './i18n'
import { apiAccessPermissions } from '@/constraints/api'
import { UserVerifyStatus } from '@/types/type'
import { ErrorWithStatus } from '@/types/errors'
import { controllers, IRequestHandler } from '@/controllers'

export const wrapRequestHandler = (controller: keyof IRequestHandler) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      await controllers[controller](req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export const handleResponseSuccess = <T>(res: Response, responseValue?: Partial<ResponseDto<T>>) => {
  const message = responseValue?.message

  if (responseValue?.data) {
    return res.status(HTTP_STATUS.OK).json({
      message: message || useI18n.__('success'),
      data: responseValue.data
    })
  }

  return res.status(HTTP_STATUS.OK).json({
    message: message || useI18n.__('success')
  })
}

export const checkPermission = (url: string, userStatus: UserVerifyStatus) => {
  const permissions = apiAccessPermissions[url]

  if (!permissions.includes(userStatus)) {
    return new ErrorWithStatus({
      message:
        userStatus === UserVerifyStatus.banned
          ? useI18n.__('validate.common.banned')
          : useI18n.__('validate.common.notEmailVerify'),
      statusCode: HTTP_STATUS.FORBIDDEN
    })
  }

  return true
}
