import { HTTP_STATUS } from '@/constraints/httpStatus'
import { IRequestHandler, requestHandler } from '@/middlewares'
import { ResponseDto } from '@/models/dto'
import { NextFunction, Request, Response } from 'express'
import { useI18n } from './i18n'

export const wrapRequestHandler = (controller: keyof IRequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler[controller](req, res, next)
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
