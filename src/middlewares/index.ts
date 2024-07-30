import { registerController } from '@/controllers/user.js'
import { reqRegister } from '@/models/dto/register'
import { registerValidate } from './user'
import { ObjectSchema } from 'joi'

export interface IValidators {
  registerValidate: ObjectSchema<reqRegister>
}

export interface IRequestHandler {
  registerController: any
}

export const validators: IValidators = {
  registerValidate
}

export const requestHandler: IRequestHandler = {
  registerController
}
