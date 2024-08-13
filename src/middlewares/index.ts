import { reqLogin } from '@/models/dto/users/login'
import { reqLogout } from '@/models/dto/users/logout'
import { reqRegister } from '@/models/dto/users/register'
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
  verifyForgotPasswordTokenController,
  meProfileController
} from '@/controllers'
import { resendMailTokenController } from '@/controllers/token/token'
import { reqForgotPassword } from '@/models/dto/users/forgotPassword'
import { forgotPasswordController } from '@/controllers/auth/forgotPassword'
import { getMeController } from '@/controllers/users/me'
import { reqMeProfile } from '@/models/dto/users/meProfile'
import { meProfileValidate } from './validates/user/meProfile'
import {
  reqAccessToken,
  reqAuthorization,
  reqVerifyEmail,
  reqVerifyForgotPasswordToken
} from '@/models/dto/token/token'

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
  meProfileValidate: ObjectSchema<reqMeProfile>
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
  meProfileController: Controller<reqMeProfile>
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
  accessTokenValidate,
  meProfileValidate
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
  getMeController,
  meProfileController
}
