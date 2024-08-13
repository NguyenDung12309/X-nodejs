import { API_CONST } from '@/constraints/api'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.post(
  API_CONST.refreshToken,
  validatorMiddleWare({ validator: 'refreshTokenValidate', initStatusCode: HTTP_STATUS.UNAUTHORIZED }),
  wrapRequestHandler('getNewAccessTokenController')
)

router.post(
  API_CONST.verifyEmail,
  validatorMiddleWare({ validator: 'verifyEmailValidate', initStatusCode: HTTP_STATUS.BAD_REQUEST }),
  wrapRequestHandler('verifyEmailController')
)

router.post(
  API_CONST.resendVerifyEmail,
  validatorMiddleWare({
    validator: 'resendVerifyEmailValidate',
    location: 'headers',
    initStatusCode: HTTP_STATUS.UNAUTHORIZED
  }),
  wrapRequestHandler('resendMailTokenController')
)

export const tokenRouter = router
