import { resendVerifyEmailValidate } from './user/verifyEmail'
import { ObjectSchema } from 'joi'
import { reqRegister } from '@/models/dto/auth/register'
import { reqLogin } from '@/models/dto/auth/login'

import { reqForgotPassword } from '@/models/dto/auth/forgotPassword'
import { meUpdateValidate } from './user/meUpdate'
import { forgotPasswordValidate, loginValidate, logoutValidate, registerValidate } from './auth'
import { accessTokenValidate, forgotPasswordTokenValidate, refreshTokenValidate, verifyEmailValidate } from './token'
import {
  reqAuthorization,
  reqForgotPasswordToken,
  reqRefreshToken,
  reqVerifyEmailToken
} from '@/models/dto/token/token'
import { reqMeUpdate } from '@/models/dto/users'
import { reqUserProfile } from '@/models/dto/users/userProfile'
import { userProfileValidate } from './user/userProfile'
import { reqFollow } from '@/models/dto/follow/follow'
import { followValidate } from './follow'

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
  meUpdateValidate: ObjectSchema<reqMeUpdate>
  userProfileValidate: ObjectSchema<reqUserProfile>
  followValidate: ObjectSchema<reqFollow>
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
  meUpdateValidate,
  userProfileValidate,
  followValidate
}
