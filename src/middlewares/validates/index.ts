import { resendVerifyEmailValidate, verifyEmailValidate } from './user/verifyEmail'
import { refreshTokenValidate, accessTokenValidate } from './token/token'
import { logoutValidate } from './user/logout'
import { registerValidate } from './user/register'
import { loginValidate } from './user/login'
import { forgotPasswordTokenValidate, forgotPasswordValidate } from './user/forgotPassword'
import { ObjectSchema } from 'joi'
import { reqRegister } from '@/models/dto/users/register'
import { reqLogin } from '@/models/dto/users/login'
import {
  reqAccessToken,
  reqAuthorization,
  reqVerifyEmail,
  reqVerifyForgotPasswordToken
} from '@/models/dto/token/token'
import { reqForgotPassword } from '@/models/dto/users/forgotPassword'
import { reqLogout } from '@/models/dto/users/logout'
import { reqMeProfile } from '@/models/dto/users/meProfile'
import { meProfileValidate } from './user/meProfile'

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

export const validators: IValidators = {
  loginValidate,
  registerValidate,
  logoutValidate,
  refreshTokenValidate,
  verifyEmailValidate,
  resendVerifyEmailValidate,
  forgotPasswordTokenValidate,
  forgotPasswordValidate,
  accessTokenValidate,
  meProfileValidate
}
