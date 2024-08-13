import { verifyForgotPasswordTokenController } from './auth/forgotPassword'
import { loginController } from './auth/login'
import { logoutController } from './auth/logout'
import { registerController } from './auth/register'
import { getNewAccessTokenController, verifyEmailController } from './token/token'
import { meProfileController } from './users/meProfile'

export {
  loginController,
  registerController,
  logoutController,
  getNewAccessTokenController,
  verifyEmailController,
  verifyForgotPasswordTokenController,
  meProfileController
}
