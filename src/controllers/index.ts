import { verifyForgotPasswordTokenController } from './users/forgotPassword'
import { loginController } from './users/login'
import { logoutController } from './users/logout'
import { registerController } from './users/register'
import { getNewAccessTokenController, verifyEmailController } from './users/token'
import { updateProfileController } from './users/updateProfile'

export {
  loginController,
  registerController,
  logoutController,
  getNewAccessTokenController,
  verifyEmailController,
  verifyForgotPasswordTokenController,
  updateProfileController
}
