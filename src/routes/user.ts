import { HTTP_STATUS } from '@/constraints/httpStatus'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/login', validatorMiddleWare({ validator: 'loginValidate' }), wrapRequestHandler('loginController'))

userRouter.post(
  '/register',
  validatorMiddleWare({ validator: 'registerValidate' }),
  wrapRequestHandler('registerController')
)

userRouter.post(
  '/logout',
  validatorMiddleWare({ validator: 'logoutValidate', initStatusCode: HTTP_STATUS.UNAUTHORIZED }),
  wrapRequestHandler('logoutController')
)

userRouter.post(
  '/refresh-token',
  validatorMiddleWare({ validator: 'refreshTokenValidate', initStatusCode: HTTP_STATUS.UNAUTHORIZED }),
  wrapRequestHandler('getNewAccessTokenController')
)

userRouter.post(
  '/verify-email',
  validatorMiddleWare({ validator: 'verifyEmailValidate', initStatusCode: HTTP_STATUS.BAD_REQUEST }),
  wrapRequestHandler('verifyEmailController')
)

userRouter.post(
  '/resend-verify-email',
  validatorMiddleWare({
    validator: 'resendVerifyEmailValidate',
    location: 'headers',
    initStatusCode: HTTP_STATUS.UNAUTHORIZED
  }),
  wrapRequestHandler('resendMailTokenController')
)

userRouter.post(
  '/forgot-password',
  validatorMiddleWare({ validator: 'forgotPasswordValidate', initStatusCode: HTTP_STATUS.BAD_REQUEST }),
  wrapRequestHandler('forgotPasswordController')
)

userRouter.post(
  '/verify-forgot-password',
  validatorMiddleWare({ validator: 'forgotPasswordTokenValidate', initStatusCode: HTTP_STATUS.UNAUTHORIZED }),
  wrapRequestHandler('verifyForgotPasswordTokenController')
)

userRouter.get(
  '/me',
  validatorMiddleWare({
    validator: 'accessTokenValidate',
    location: 'headers',
    initStatusCode: HTTP_STATUS.UNAUTHORIZED
  }),
  wrapRequestHandler('getMeController')
)

userRouter.get('/tweets', (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        text: 'hello world'
      }
    ]
  })
})

export default userRouter
