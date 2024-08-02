import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqLogin } from '@/models/dto/users/login'
import { reqLogout } from '@/models/dto/users/logout'
import { reqRegister } from '@/models/dto/users/register'
import { reqAccessToken } from '@/models/dto/users/token'
import { userService } from '@/services/user'
import { __ } from 'i18n'

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

export const logoutValidate = joi.object<reqLogout>({
  refresh_token: joi
    .string()
    .required()
    .trim()
    .external(userService.verifyTRefreshToken)
    .messages(
      getCommonMessageValidate<reqLogout>({
        field: 'refresh_token'
      })
    )
})

export const refreshTokenValidate = joi.object<reqLogout>({
  refresh_token: joi
    .string()
    .required()
    .trim()
    .external(userService.verifyTRefreshToken)
    .messages(
      getCommonMessageValidate<reqAccessToken>({
        field: 'refresh_token'
      })
    )
})
