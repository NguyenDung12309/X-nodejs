import { resendVerifyEmailValidate } from './user/verifyEmail'
import { ObjectSchema } from 'joi'
import { reqRegister } from '@/models/dto/auth/register'
import { reqLogin } from '@/models/dto/auth/login'

import { reqForgotPassword } from '@/models/dto/auth/forgotPassword'
import { reqMeProfile } from '@/models/dto/users/meProfile'
import { meProfileValidate } from './user/meProfile'
import { forgotPasswordValidate, loginValidate, logoutValidate, registerValidate } from './auth'
import { accessTokenValidate, forgotPasswordTokenValidate, refreshTokenValidate, verifyEmailValidate } from './token'
import {
  reqAuthorization,
  reqForgotPasswordToken,
  reqRefreshToken,
  reqVerifyEmailToken
} from '@/models/dto/token/token'

export interface IValidators {
  registerValidate: ObjectSchema<reqRegister>
  loginValidate: ObjectSchema<reqLogin>
  logoutValidate: ObjectSchema<reqRefreshToken>
  refreshTokenValidate: ObjectSchema<reqRefreshToken>
  verifyEmailValidate: ObjectSchema<reqVerifyEmailToken>
  resendVerifyEmailValidate: ObjectSchema<reqAuthorization>
  forgotPasswordTokenValidate: ObjectSchema<reqForgotPasswordToken>
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
