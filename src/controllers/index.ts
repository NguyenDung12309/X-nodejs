import { verifyForgotPasswordTokenController } from './users/forgotPassword'
import { loginController } from './users/login'
import { logoutController } from './users/logout'
import { registerController } from './users/register'
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
