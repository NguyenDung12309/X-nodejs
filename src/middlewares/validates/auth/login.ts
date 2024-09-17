import { joi } from '@/helpers/joi'
import { ReqLogin } from '@/models/dto/auth/login'
import { getCommonMessageValidate } from '@/helpers/message'
import { checkEmailPasswordExists } from './custom'

export const loginValidate = joi.object<ReqLogin>({
  email: joi
    .string()
    .email()
    .required()
    .trim()
    .messages(
      getCommonMessageValidate<ReqLogin>({
        field: 'email'
      })
    ),
  password: joi
    .string()
    .required()
    .trim()
    .external(checkEmailPasswordExists)
    .messages(
      getCommonMessageValidate<ReqLogin>({
        field: 'password'
      })
    )
})
