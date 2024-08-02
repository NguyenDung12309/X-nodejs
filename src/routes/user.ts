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
