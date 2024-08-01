import { reqLogout } from './../models/dto/register'
import { loginValidate, logoutValidate } from '@/middlewares/user.js'
import { loginController, logoutController, registerController } from '@/controllers/user.js'
import { reqLogin, reqRegister } from '@/models/dto/register'
import { registerValidate } from './user'
import { ObjectSchema } from 'joi'
import { Controller } from '@/types/type'

export interface IValidators {
  registerValidate: ObjectSchema<reqRegister>
  loginValidate: ObjectSchema<reqLogin>
  logoutValidate: ObjectSchema<reqLogout>
}

export interface IRequestHandler {
  registerController: Controller<reqRegister>
  loginController: Controller<reqLogin>
  logoutController: Controller<reqLogout>
}

export const validators: IValidators = {
  registerValidate,
  loginValidate,
  logoutValidate
}

export const requestHandler: IRequestHandler = {
  registerController,
  loginController,
  logoutController
}
