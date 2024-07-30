import { HTTP_STATUS } from '@/constraints/httpStatus'
import { ErrorHandler } from '@/types/type'
import { omit } from 'lodash'

export const defaultErrorHandler: ErrorHandler = (error, req, res, _) => {
  res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(error, 'statusCode'))
}
