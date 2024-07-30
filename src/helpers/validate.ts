import { IValidators, validators } from '@/middlewares'
import { NextFunction, Request, Response } from 'express'
import { has } from 'lodash'
import Joi, { ValidationErrorItem } from 'joi'
import { stringToObject } from './utils'
import { HTTP_STATUS } from '@/constraints/httpStatus'

export const validatorMiddleWare = function (validator: keyof IValidators) {
  if (!has(validators, validator)) throw new Error(`'${validator}' is not exist`)

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await validators[validator].validateAsync(req.body)

      next()
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        let statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY

        const mapkupErrorDetail = err.details.map((detail) => {
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

        err.details = mapkupErrorDetail as unknown as ValidationErrorItem[]
        ;(err as any).statusCode = statusCode

        next(err)
      }

      next(err)
    }
  }
}
