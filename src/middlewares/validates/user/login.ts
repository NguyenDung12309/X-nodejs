import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqLogin } from '@/models/dto/users/login'
import { userService } from '@/services/user'

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
    .external(userService.checkEmailPasswordExists)
    .messages(
      getCommonMessageValidate<reqLogin>({
        field: 'password'
      })
    )
})
