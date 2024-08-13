import { API_CONST } from '@/constraints/api'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const userRouter = express.Router()

userRouter.post(
  API_CONST.login,
  validatorMiddleWare({ validator: 'loginValidate' }),
  wrapRequestHandler('loginController')
)

userRouter.post(
  API_CONST.register,
  validatorMiddleWare({ validator: 'registerValidate' }),
  wrapRequestHandler('registerController')
)

userRouter.post(
  API_CONST.logout,
  validatorMiddleWare({ validator: 'logoutValidate', initStatusCode: HTTP_STATUS.UNAUTHORIZED }),
  wrapRequestHandler('logoutController')
)

userRouter.post(
  API_CONST.refreshToken,
  validatorMiddleWare({ validator: 'refreshTokenValidate', initStatusCode: HTTP_STATUS.UNAUTHORIZED }),
  wrapRequestHandler('getNewAccessTokenController')
)

userRouter.post(
  API_CONST.verifyEmail,
  validatorMiddleWare({ validator: 'verifyEmailValidate', initStatusCode: HTTP_STATUS.BAD_REQUEST }),
  wrapRequestHandler('verifyEmailController')
)

userRouter.post(
  API_CONST.forgotPassword,
  validatorMiddleWare({ validator: 'forgotPasswordValidate', initStatusCode: HTTP_STATUS.BAD_REQUEST }),
  wrapRequestHandler('forgotPasswordController')
)

userRouter.post(
  API_CONST.verifyForgotPassword,
  validatorMiddleWare({ validator: 'forgotPasswordTokenValidate', initStatusCode: HTTP_STATUS.UNAUTHORIZED }),
  wrapRequestHandler('verifyForgotPasswordTokenController')
)

userRouter.post(
  API_CONST.resendVerifyEmail,
  validatorMiddleWare({
    validator: 'resendVerifyEmailValidate',
    location: 'headers',
    initStatusCode: HTTP_STATUS.UNAUTHORIZED
  }),
  wrapRequestHandler('resendMailTokenController')
)

userRouter.get(API_CONST.me, wrapRequestHandler('getMeController'))

userRouter.patch(
  API_CONST.meProfile,
  validatorMiddleWare({
    validator: 'meProfileValidate'
  }),
  wrapRequestHandler('meProfileController')
)

export default userRouter
