import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqRegister } from '@/models/dto/register'
import { userService } from '@/services/user'
import { MiddleWare } from '@/types/type.js'
import { __ } from 'i18n'

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
  email: joi
    .string()
    .email()
    .required()
    .trim()
    .external(userService.checkEmailExists)
    .messages(
      getCommonMessageValidate<reqRegister>({
        field: 'email'
      })
    ),
  name: joi
    .string()
    .max(100)
    .required()
    .trim()
    .messages(
      getCommonMessageValidate<reqRegister>({
        field: 'name',
        min: '1',
        max: '100'
      })
    ),
  password: joi
    .string()
    .required()
    .min(6)
    .max(50)
    .trim()
    .messages(
      getCommonMessageValidate<reqRegister>({
        field: 'password',
        min: '6',
        max: '50'
      })
    ),
  confirm_password: joi.valid(joi.ref('password')).messages(
    getCommonMessageValidate<reqRegister>({
      field: 'confirm_password',
      matchField: 'password'
    })
  ),
  date_of_birth: joi
    .date()
    .iso()
    .messages(
      getCommonMessageValidate<reqRegister>({
        field: 'date_of_birth'
      })
    )
})
