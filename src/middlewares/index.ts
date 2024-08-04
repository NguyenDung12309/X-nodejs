import { reqLogin } from '@/models/dto/users/login'
import { reqLogout } from '@/models/dto/users/logout'
import { reqRegister } from '@/models/dto/users/register'
import { reqAccessToken, reqVerifyEmail } from '@/models/dto/users/token'
import { Controller } from '@/types/type'
import { ObjectSchema } from 'joi'
import { registerValidate, loginValidate, logoutValidate, refreshTokenValidate, verifyEmailValidate } from './validates'
import {
  registerController,
  loginController,
  logoutController,
  getNewAccessTokenController,
  verifyEmailController
} from '@/controllers'

export interface IValidators {
  registerValidate: ObjectSchema<reqRegister>
  loginValidate: ObjectSchema<reqLogin>
  logoutValidate: ObjectSchema<reqLogout>
  refreshTokenValidate: ObjectSchema<reqAccessToken>
  verifyEmailValidate: ObjectSchema<reqVerifyEmail>
}

export interface IRequestHandler {
  registerController: Controller<reqRegister>
  loginController: Controller<reqLogin>
  logoutController: Controller<reqLogout>
  getNewAccessTokenController: Controller<reqAccessToken>
  verifyEmailController: Controller<reqVerifyEmail>
}

export const validators: IValidators = {
  registerValidate,
  loginValidate,
  logoutValidate,
  refreshTokenValidate,
  verifyEmailValidate
}

export const requestHandler: IRequestHandler = {
  registerController,
  loginController,
  logoutController,
  getNewAccessTokenController,
  verifyEmailController
}
