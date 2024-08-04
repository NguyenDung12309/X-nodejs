import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqRegister } from '@/models/dto/users/register'
import { userService } from '@/services/user'

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
