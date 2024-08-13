import { JoiErrorMessages } from '@/types/errors'
import { useI18n } from './i18n'

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
