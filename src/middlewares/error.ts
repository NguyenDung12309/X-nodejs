import { HTTP_STATUS } from '@/constraints/httpStatus'
import { useI18n } from '@/helpers/i18n'
import { ErrorHandler } from '@/types/type'
import Joi from 'joi'
import { omit } from 'lodash'

export const defaultErrorHandler: ErrorHandler = (error, req, res, _) => {
  res
    .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json(error instanceof Joi.ValidationError ? omit(error, 'statusCode') : { message: useI18n.__('500') })
}
