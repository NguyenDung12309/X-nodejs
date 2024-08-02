import { loginValidate, logoutValidate, refreshTokenValidate } from '@/middlewares/user.js'

import { registerValidate } from './user'
import { ObjectSchema } from 'joi'
import { Controller } from '@/types/type'
import { reqRegister } from '@/models/dto/users/register'
import { reqLogin } from '@/models/dto/users/login'
import { reqLogout } from '@/models/dto/users/logout'
import { reqAccessToken } from '@/models/dto/users/token'
import { registerController } from '@/controllers/users/register'
import { loginController } from '@/controllers/users/login'
import { logoutController } from '@/controllers/users/logout'
import { getNewAccessTokenController } from '@/controllers/users/token'

export interface IValidators {
  registerValidate: ObjectSchema<reqRegister>
  loginValidate: ObjectSchema<reqLogin>
  logoutValidate: ObjectSchema<reqLogout>
  refreshTokenValidate: ObjectSchema<reqAccessToken>
}

export interface IRequestHandler {
  registerController: Controller<reqRegister>
  loginController: Controller<reqLogin>
  logoutController: Controller<reqLogout>
  getNewAccessTokenController: Controller<reqAccessToken>
}

export const validators: IValidators = {
  registerValidate,
  loginValidate,
  logoutValidate,
  refreshTokenValidate
}

export const requestHandler: IRequestHandler = {
  registerController,
  loginController,
  logoutController,
  getNewAccessTokenController
}
