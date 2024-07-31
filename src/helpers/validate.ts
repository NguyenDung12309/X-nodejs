import { IValidators, validators } from '@/middlewares'
import { NextFunction, Request, Response } from 'express'
import { has } from 'lodash'
import Joi, { ValidationErrorItem } from 'joi'
import { stringToObject } from './utils'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { JoiErrorMessages } from '@/types/errors'
import { useI18n } from './i18n'

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

        return
      }

      next(err)
    }
  }
}

export const getCommonMessageValidate = <T>(param: {
  field?: keyof T
  min?: string
  max?: string
  matchField?: keyof T
}) => {
  const fieldName = param.field as string
  const matchFieldName = param.matchField as string

  const customMessages: JoiErrorMessages = {
    'any.required': useI18n.__('validate.common.require', { field: fieldName || '' }),
    'string.empty': useI18n.__('validate.common.require', { field: fieldName || '' }),
    'any.empty': useI18n.__('validate.common.require', { field: fieldName || '' }),
    'string.base': useI18n.__('validate.common.stringOnly', { field: fieldName || '' }),
    'string.email': useI18n.__('validate.common.invalid', { field: fieldName || '' }),
    'string.min': useI18n.__('validate.common.minMax', {
      field: fieldName || '',
      min: param.min || '',
      max: param.max || ''
    }),
    'string.max': useI18n.__('validate.common.minMax', {
      field: fieldName || '',
      min: param.min || '',
      max: param.max || ''
    }),
    'any.only': useI18n.__('validate.common.matchField', { field: fieldName || '', match: matchFieldName || '' }),
    'date.format': useI18n.__('validate.common.iso8601', { field: fieldName || '' })
  }

  return customMessages
}
