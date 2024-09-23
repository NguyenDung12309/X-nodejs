import { joi } from '@/helpers/joi'
import { ReqRegister } from '@/models/dto/auth/register'
import { getCommonMessageValidate } from '@/helpers/message'
import { checkEmailExists } from './custom'

export const registerValidate = joi.object<ReqRegister>({
  email: joi
    .string()
    .email()
    .required()
    .trim()
    .external(checkEmailExists)
    .messages(
      getCommonMessageValidate<ReqRegister>({
        field: 'email'
      })
    ),

  name: joi
    .string()
    .max(100)
    .required()
    .trim()
    .messages(
      getCommonMessageValidate<ReqRegister>({
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
      getCommonMessageValidate<ReqRegister>({
        field: 'password',
        min: '6',
        max: '50'
      })
    ),
  confirm_password: joi
    .string()
    .required()
    .valid(joi.ref('password'))
    .messages(
      getCommonMessageValidate<ReqRegister>({
        field: 'confirm_password',
        matchField: 'password'
      })
    ),
  date_of_birth: joi
    .date()
    .required()
    .iso()
    .messages(
      getCommonMessageValidate<ReqRegister>({
        field: 'date_of_birth'
      })
    )
})
