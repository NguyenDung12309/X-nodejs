import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqResetPassword } from '@/models/dto/auth/resetPassword'

export const resetPasswordValidate = joi.object<ReqResetPassword>({
  password: joi
    .string()
    .required()
    .min(6)
    .max(50)
    .trim()
    .messages(
      getCommonMessageValidate<ReqResetPassword>({
        field: 'password',
        min: '6',
        max: '50'
      })
    ),
  confirm_password: joi.valid(joi.ref('password')).messages(
    getCommonMessageValidate<ReqResetPassword>({
      field: 'confirm_password',
      matchField: 'password'
    })
  )
})
