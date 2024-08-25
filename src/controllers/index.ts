import { Controller } from '@/types/type'
import { getNewAccessTokenController, resendMailTokenController, verifyEmailController } from './token/token'
import { forgotPasswordController, verifyForgotPasswordTokenController } from './auth/forgotPassword'
import { loginController } from './auth/login'
import { logoutController } from './auth/logout'
import { getMeController } from './users/me'
import { registerController } from './auth/register'
import { userProfileController } from './users/userProfile'
import { reqRegister } from '@/models/dto/auth/register'
import { reqLogin } from '@/models/dto/auth/login'

import { reqForgotPassword } from '@/models/dto/auth/forgotPassword'
import {
  reqAuthorization,
  reqForgotPasswordToken,
  reqRefreshToken,
  reqVerifyEmailToken
} from '@/models/dto/token/token'
import { reqMeUpdate } from '@/models/dto/users'
import { meUpdateController } from './users/meUpdate'
import { reqUserProfile } from '@/models/dto/users/userProfile'
import { reqFollow } from '@/models/dto/follow/follow'
import { followController } from './follow/follow'
import { unFollowController } from './follow/unFollow'
import { reqUnFollow } from '@/models/dto/follow/unFollow'
import { reqResetPassword } from '@/models/dto/auth/resetPassword'
import { resetPasswordController } from './auth/resetPassword'

export interface IRequestHandler {
  registerController: Controller<reqRegister>
  loginController: Controller<reqLogin>
  logoutController: Controller<reqRefreshToken>
  getNewAccessTokenController: Controller<reqRefreshToken>
  verifyEmailController: Controller<reqVerifyEmailToken>
  resendMailTokenController: Controller<reqAuthorization>
  verifyForgotPasswordTokenController: Controller<reqForgotPasswordToken>
  forgotPasswordController: Controller<reqForgotPassword>
  getMeController: Controller<reqAuthorization>
  meUpdateController: Controller<reqMeUpdate>
  userProfileController: Controller<any, reqUserProfile>
  followController: Controller<reqFollow>
  unFollowController: Controller<reqUnFollow>
  resetPasswordController: Controller<reqResetPassword>
}

export const controllers: IRequestHandler = {
  loginController,
  registerController,
  logoutController,
  getNewAccessTokenController,
  verifyEmailController,
  verifyForgotPasswordTokenController,
  meUpdateController,
  forgotPasswordController,
  resendMailTokenController,
  getMeController,
  userProfileController,
  followController,
  unFollowController,
  resetPasswordController
}
