import { joi } from '@/helpers/joi'
import { reqLogin } from '@/models/dto/users/login'
import { checkEmailPasswordExists } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'

export const loginValidate = joi.object<reqLogin>({
  email: joi
    .string()
    .email()
    .required()
    .trim()
    .messages(
      getCommonMessageValidate<reqLogin>({
        field: 'email'
      })
    ),
  password: joi
    .string()
    .required()
    .trim()
    .external(checkEmailPasswordExists)
    .messages(
      getCommonMessageValidate<reqLogin>({
        field: 'password'
      })
    )
})
