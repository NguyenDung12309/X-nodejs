import { MiddleWare } from '@/types/type.js'

export const loginValidate: MiddleWare = (req, res, next) => {
  const body = req.body

  const { email, password } = body

  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password'
    })
  }

  next()
}
