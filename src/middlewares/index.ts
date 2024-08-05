import { reqLogin } from '@/models/dto/users/login'
import { reqLogout } from '@/models/dto/users/logout'
import { reqRegister } from '@/models/dto/users/register'
import {
  reqAccessToken,
  reqAuthorization,
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
  resendVerifyEmailValidate,
  forgotPasswordTokenValidate,
  forgotPasswordValidate,
  accessTokenValidate
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
import { reqForgotPassword } from '@/models/dto/users/forgotPassword'
import { forgotPasswordController } from '@/controllers/users/forgotPassword'
import { getMeController } from '@/controllers/users/me'

export interface IValidators {
  registerValidate: ObjectSchema<reqRegister>
  loginValidate: ObjectSchema<reqLogin>
  logoutValidate: ObjectSchema<reqLogout>
  refreshTokenValidate: ObjectSchema<reqAccessToken>
  verifyEmailValidate: ObjectSchema<reqVerifyEmail>
  resendVerifyEmailValidate: ObjectSchema<reqAuthorization>
  forgotPasswordTokenValidate: ObjectSchema<reqVerifyForgotPasswordToken>
  forgotPasswordValidate: ObjectSchema<reqForgotPassword>
  accessTokenValidate: ObjectSchema<reqAuthorization>
}

export interface IRequestHandler {
  registerController: Controller<reqRegister>
  loginController: Controller<reqLogin>
  logoutController: Controller<reqLogout>
  getNewAccessTokenController: Controller<reqAccessToken>
  verifyEmailController: Controller<reqVerifyEmail>
  resendMailTokenController: Controller<reqAuthorization>
  verifyForgotPasswordTokenController: Controller<reqVerifyForgotPasswordToken>
  forgotPasswordController: Controller<reqForgotPassword>
  getMeController: Controller<reqAuthorization>
}

export const validators: IValidators = {
  registerValidate,
  loginValidate,
  logoutValidate,
  refreshTokenValidate,
  verifyEmailValidate,
  resendVerifyEmailValidate,
  forgotPasswordTokenValidate,
  forgotPasswordValidate,
  accessTokenValidate
}

export const requestHandler: IRequestHandler = {
  registerController,
  loginController,
  logoutController,
  getNewAccessTokenController,
  verifyEmailController,
  resendMailTokenController,
  verifyForgotPasswordTokenController,
  forgotPasswordController,
  getMeController
}
