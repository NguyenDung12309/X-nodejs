import { reqLogin } from '@/models/dto/users/login'
import { reqLogout } from '@/models/dto/users/logout'
import { reqRegister } from '@/models/dto/users/register'
import {
  reqAccessToken,
  reqResendMailToken,
  reqVerifyEmail,
  reqVerifyForgotPasswordToken
} from '@/models/dto/users/token'
import { Controller } from '@/types/type'
import { ObjectSchema } from 'joi'
import {
  registerValidate,
  loginValidate,
  logoutValidate,
  refreshTokenValidate,
  verifyEmailValidate,
  accessTokenValidate,
  forgotPasswordTokenValidate
} from './validates'
import {
  registerController,
  loginController,
  logoutController,
  getNewAccessTokenController,
  verifyEmailController,
  verifyForgotPasswordTokenController
} from '@/controllers'
import { resendMailTokenController } from '@/controllers/users/token'

export interface IValidators {
  registerValidate: ObjectSchema<reqRegister>
  loginValidate: ObjectSchema<reqLogin>
  logoutValidate: ObjectSchema<reqLogout>
  refreshTokenValidate: ObjectSchema<reqAccessToken>
  verifyEmailValidate: ObjectSchema<reqVerifyEmail>
  accessTokenValidate: ObjectSchema<reqResendMailToken>
  forgotPasswordTokenValidate: ObjectSchema<reqVerifyForgotPasswordToken>
}

export interface IRequestHandler {
  registerController: Controller<reqRegister>
  loginController: Controller<reqLogin>
  logoutController: Controller<reqLogout>
  getNewAccessTokenController: Controller<reqAccessToken>
  verifyEmailController: Controller<reqVerifyEmail>
  resendMailTokenController: Controller<reqResendMailToken>
  verifyForgotPasswordTokenController: Controller<reqVerifyForgotPasswordToken>
}

export const validators: IValidators = {
  registerValidate,
  loginValidate,
  logoutValidate,
  refreshTokenValidate,
  verifyEmailValidate,
  accessTokenValidate,
  forgotPasswordTokenValidate
}

export const requestHandler: IRequestHandler = {
  registerController,
  loginController,
  logoutController,
  getNewAccessTokenController,
  verifyEmailController,
  resendMailTokenController,
  verifyForgotPasswordTokenController
}
