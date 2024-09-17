import { Controller } from '@/types/type'
import { getNewAccessTokenController, resendMailTokenController, verifyEmailController } from './token/token'
import { forgotPasswordController, verifyForgotPasswordTokenController } from './auth/forgotPassword'
import { loginController } from './auth/login'
import { logoutController } from './auth/logout'
import { getMeController } from './users/me'
import { registerController } from './auth/register'
import { userProfileController } from './users/userProfile'
import { ReqRegister } from '@/models/dto/auth/register'
import { ReqLogin } from '@/models/dto/auth/login'

import { ReqForgotPassword } from '@/models/dto/auth/forgotPassword'
import {
  ReqAuthorization,
  ReqForgotPasswordToken,
  ReqRefreshToken,
  ReqVerifyEmailToken
} from '@/models/dto/token/token'
import { ReqMeUpdate } from '@/models/dto/users'
import { meUpdateController } from './users/meUpdate'
import { ReqUserProfile } from '@/models/dto/users/userProfile'
import { ReqFollow } from '@/models/dto/follow/follow'
import { followController } from './follow/follow'
import { unFollowController } from './follow/unFollow'
import { ReqUnFollow } from '@/models/dto/follow/unFollow'
import { ReqResetPassword } from '@/models/dto/auth/resetPassword'
import { resetPasswordController } from './auth/resetPassword'
import { uploadImageController } from './media/uploadImage'
import { ReqUploadVideo } from '@/models/dto/media/uploadVideo'
import { ReqUploadImage } from '@/models/dto/media/uploadImage'
import { uploadVideoController } from './media/uploadVideo'

export interface IRequestHandler {
  registerController: Controller<ReqRegister>
  loginController: Controller<ReqLogin>
  logoutController: Controller<ReqRefreshToken>
  getNewAccessTokenController: Controller<ReqRefreshToken>
  verifyEmailController: Controller<ReqVerifyEmailToken>
  resendMailTokenController: Controller<ReqAuthorization>
  verifyForgotPasswordTokenController: Controller<ReqForgotPasswordToken>
  forgotPasswordController: Controller<ReqForgotPassword>
  getMeController: Controller<ReqAuthorization>
  meUpdateController: Controller<ReqMeUpdate>
  userProfileController: Controller<any, ReqUserProfile>
  followController: Controller<ReqFollow>
  unFollowController: Controller<ReqUnFollow>
  resetPasswordController: Controller<ReqResetPassword>
  uploadImageController: Controller<ReqUploadImage>
  uploadVideoController: Controller<ReqUploadVideo>
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
  resetPasswordController,
  uploadImageController,
  uploadVideoController
}
