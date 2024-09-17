import { HTTP_STATUS } from '@/constraints/httpStatus'
import { useI18n } from '@/helpers/i18n'
import { ErrorHandler } from '@/types/type'
import { omit } from 'lodash'

export const defaultErrorHandler: ErrorHandler = (error, _, res, __) => {
  res
    .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json(
      error.statusCode && error.statusCode !== HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? omit(error, ['statusCode'])
        : { message: useI18n.__('500'), detail: error.toString() }
    )
}
