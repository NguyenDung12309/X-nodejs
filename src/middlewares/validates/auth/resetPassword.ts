import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { reqResetPassword } from '@/models/dto/auth/resetPassword'

export const resetPasswordValidate = joi.object<reqResetPassword>({
  password: joi
    .string()
    .required()
    .min(6)
    .max(50)
    .trim()
    .messages(
      getCommonMessageValidate<reqResetPassword>({
        field: 'password',
        min: '6',
        max: '50'
      })
    ),
  confirm_password: joi.valid(joi.ref('password')).messages(
    getCommonMessageValidate<reqResetPassword>({
      field: 'confirm_password',
      matchField: 'password'
    })
  )
})
