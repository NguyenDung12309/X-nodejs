import { Controller } from '@/types/type'
import { getNewAccessTokenController, resendMailTokenController, verifyEmailController } from './token/token'
import { forgotPasswordController, verifyForgotPasswordTokenController } from './auth/forgotPassword'
import { loginController } from './auth/login'
import { logoutController } from './auth/logout'
import { getMeController } from './users/me'
import { meProfileController } from './users/meProfile'
import { registerController } from './auth/register'
import { userProfileController } from './users/userProfile'
import { reqRegister } from '@/models/dto/auth/register'
import { reqLogin } from '@/models/dto/auth/login'

import { reqForgotPassword } from '@/models/dto/auth/forgotPassword'
import { reqMeProfile } from '@/models/dto/users/meProfile'
import {
  reqAuthorization,
  reqForgotPasswordToken,
  reqRefreshToken,
  reqVerifyEmailToken
} from '@/models/dto/token/token'

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
  meProfileController: Controller<reqMeProfile>
  userProfileController: Controller<any>
}

export const controllers: IRequestHandler = {
  loginController,
  registerController,
  logoutController,
  getNewAccessTokenController,
  verifyEmailController,
  verifyForgotPasswordTokenController,
  meProfileController,
  userProfileController,
  forgotPasswordController,
  resendMailTokenController,
  getMeController
}
