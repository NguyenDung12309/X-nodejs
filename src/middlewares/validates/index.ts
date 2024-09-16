import { resendVerifyEmailValidate } from './user/verifyEmail'
import { ObjectSchema } from 'joi'
import { ReqRegister } from '@/models/dto/auth/register'
import { ReqLogin } from '@/models/dto/auth/login'

import { ReqForgotPassword } from '@/models/dto/auth/forgotPassword'
import { meUpdateValidate } from './user/meUpdate'
import { forgotPasswordValidate, loginValidate, logoutValidate, registerValidate } from './auth'
import { accessTokenValidate, forgotPasswordTokenValidate, refreshTokenValidate, verifyEmailValidate } from './token'
import {
  ReqAuthorization,
  ReqForgotPasswordToken,
  ReqRefreshToken,
  ReqVerifyEmailToken
} from '@/models/dto/token/token'
import { ReqMeUpdate } from '@/models/dto/users'
import { ReqUserProfile } from '@/models/dto/users/userProfile'
import { userProfileValidate } from './user/userProfile'
import { ReqFollow } from '@/models/dto/follow/follow'
import { followValidate } from './follow'
import { unFollowValidate } from './follow/unFollow'
import { ReqUnFollow } from '@/models/dto/follow/unFollow'
import { ReqResetPassword } from '@/models/dto/auth/resetPassword'
import { resetPasswordValidate } from './auth/resetPassword'
import { ReqTweet } from '@/models/dto/tweet/tweet'
import { tweetValidate } from './tweet/tweet'

export interface IValidators {
  registerValidate: ObjectSchema<ReqRegister>
  loginValidate: ObjectSchema<ReqLogin>
  logoutValidate: ObjectSchema<ReqRefreshToken>
  refreshTokenValidate: ObjectSchema<ReqRefreshToken>
  verifyEmailValidate: ObjectSchema<ReqVerifyEmailToken>
  resendVerifyEmailValidate: ObjectSchema<ReqAuthorization>
  forgotPasswordTokenValidate: ObjectSchema<ReqForgotPasswordToken>
  forgotPasswordValidate: ObjectSchema<ReqForgotPassword>
  accessTokenValidate: ObjectSchema<ReqAuthorization>
  meUpdateValidate: ObjectSchema<ReqMeUpdate>
  userProfileValidate: ObjectSchema<ReqUserProfile>
  followValidate: ObjectSchema<ReqFollow>
  unFollowValidate: ObjectSchema<ReqUnFollow>
  resetPasswordValidate: ObjectSchema<ReqResetPassword>
  tweetValidate: ObjectSchema<ReqTweet>
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
  followValidate,
  unFollowValidate,
  resetPasswordValidate,
  tweetValidate
}
