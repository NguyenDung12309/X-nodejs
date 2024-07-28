import { loginController, registerController } from '@/controllers/user.js'
import { loginValidate } from '@/middlewares/user.js'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/login', loginValidate, loginController)

userRouter.post('/register', registerController)

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
