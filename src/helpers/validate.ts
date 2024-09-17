import { NextFunction, Request, Response } from 'express'
import { has } from 'lodash'
import Joi, { ValidationErrorItem } from 'joi'
import { stringToObject } from './utils'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { ErrorWithStatus } from '@/types/errors'
import { userService } from '@/services/user'
import { checkPermission } from './handler'
import { apiAccessPermissions } from '@/constraints/api'
import { UserVerifyStatus } from '@/types/type'
import { IValidators, validators } from '@/middlewares/validates'

interface TValidatorMiddleWare {
  validator: keyof IValidators
  location?: keyof Request
  initStatusCode?: number
}

export const validatorMiddleWare = ({ validator, location, initStatusCode }: TValidatorMiddleWare) => {
  if (!has(validators, validator)) throw new Error(`'${validator}' is not exist`)

  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await validators[validator].validateAsync(req[location ?? 'body'])

      if (apiAccessPermissions[req.url] && userService.userInfo) {
        const isHasPermission = checkPermission(req.url, userService.userInfo.verify as UserVerifyStatus)

        if (isHasPermission instanceof ErrorWithStatus) {
          throw isHasPermission
        }
      }

      next()
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        let statusCode = initStatusCode ?? HTTP_STATUS.UNPROCESSABLE_ENTITY

        const makeupErrorDetail = err.details.map((detail) => {
          if (detail.message.includes('statusCode')) {
            const newMessage = stringToObject(detail.message)

            statusCode = +newMessage.statusCode

            return {
              ...detail,
              message: newMessage.message
            }
          }

          return detail
        })

        err.details = makeupErrorDetail as unknown as ValidationErrorItem[]
        ;(err as any).statusCode = statusCode

        next(err)

        return
      }

      next(err)
    }
  }
}
