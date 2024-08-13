import { API_CONST } from '@/constraints/api'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.post(API_CONST.login, validatorMiddleWare({ validator: 'loginValidate' }), wrapRequestHandler('loginController'))

router.post(
  API_CONST.register,
  validatorMiddleWare({ validator: 'registerValidate' }),
  wrapRequestHandler('registerController')
)

router.post(
  API_CONST.logout,
  validatorMiddleWare({ validator: 'logoutValidate', initStatusCode: HTTP_STATUS.UNAUTHORIZED }),
  wrapRequestHandler('logoutController')
)

router.post(
  API_CONST.forgotPassword,
  validatorMiddleWare({ validator: 'forgotPasswordValidate', initStatusCode: HTTP_STATUS.BAD_REQUEST }),
  wrapRequestHandler('forgotPasswordController')
)

router.post(
  API_CONST.verifyForgotPassword,
  validatorMiddleWare({ validator: 'forgotPasswordTokenValidate', initStatusCode: HTTP_STATUS.UNAUTHORIZED }),
  wrapRequestHandler('verifyForgotPasswordTokenController')
)

export const authRouter = router
