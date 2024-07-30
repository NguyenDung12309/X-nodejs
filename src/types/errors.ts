import { objectAssign } from '@/helpers/utils'

export class ErrorWithStatus {
  message: string
  statusCode: number
  constructor(data: { message: string; statusCode: number }) {
    objectAssign(data, this)
  }
}

export type JoiErrorMessages = {
  'any.required'?: string
  'string.base'?: string
  'string.email'?: string
  'string.min'?: string
  'string.max'?: string
  'any.only'?: string
  'any.empty'?: string
  'string.empty'?: string
  'date.format'?: string
}
