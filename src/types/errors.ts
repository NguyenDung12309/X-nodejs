import { objectAssign } from '@/helpers/utils'

export class ErrorWithStatus {
  message: string
  statusCode: number
  constructor(data: { message: string; statusCode: number }) {
    objectAssign(data, this)
  }
}
