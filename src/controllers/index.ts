import { Controller } from '@/types/type'
import { getNewAccessTokenController, resendMailTokenController, verifyEmailController } from './token/token'
import { forgotPasswordController, verifyForgotPasswordTokenController } from './users/forgotPassword'
import { loginController } from './users/login'
import { logoutController } from './users/logout'
import { getMeController } from './users/me'
import { meProfileController } from './users/meProfile'
import { registerController } from './users/register'
import { userProfileController } from './users/userProfile'
import { reqRegister } from '@/models/dto/users/register'
import { reqLogin } from '@/models/dto/users/login'
import { reqLogout } from '@/models/dto/users/logout'
import {
  reqAccessToken,
  reqAuthorization,
  reqVerifyEmail,
  reqVerifyForgotPasswordToken
} from '@/models/dto/token/token'
import { reqForgotPassword } from '@/models/dto/users/forgotPassword'
import { reqMeProfile } from '@/models/dto/users/meProfile'

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
