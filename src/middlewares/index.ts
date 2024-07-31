import { loginValidate } from '@/middlewares/user.js'
import { loginController, registerController } from '@/controllers/user.js'
import { reqLogin, reqRegister } from '@/models/dto/register'
import { registerValidate } from './user'
import { ObjectSchema } from 'joi'
import { Controller } from '@/types/type'

export interface IValidators {
  registerValidate: ObjectSchema<reqRegister>
  loginValidate: ObjectSchema<reqLogin>
}

export interface IRequestHandler {
  registerController: Controller<reqRegister>
  loginController: Controller<reqLogin>
}

export const validators: IValidators = {
  registerValidate,
  loginValidate
}

export const requestHandler: IRequestHandler = {
  registerController,
  loginController
}
