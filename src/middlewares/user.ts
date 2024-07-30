import { joi } from '@/helpers/joi'
import { reqRegister } from '@/models/dto/register'
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

export const registerValidate = joi.object<reqRegister>({
  email: joi.string().email().required().trim(),
  name: joi.string().max(100).required().trim(),
  password: joi.string().required().min(6).max(50).trim(),
  confirm_password: joi.ref('password'),
  date_of_birth: joi.date().iso()
})
