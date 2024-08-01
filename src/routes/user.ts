import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/login', validatorMiddleWare('loginValidate'), wrapRequestHandler('loginController'))

userRouter.post('/register', validatorMiddleWare('registerValidate'), wrapRequestHandler('registerController'))

userRouter.post('/logout', validatorMiddleWare('logoutValidate'), wrapRequestHandler('logoutController'))

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
