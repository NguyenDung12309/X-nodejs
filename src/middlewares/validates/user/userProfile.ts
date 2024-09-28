import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqUserProfile } from '@/models/dto/users/userProfile'
import { checkUserNameNotExist } from './custom'

export const userProfileValidate = joi.object<ReqUserProfile>({
  username: joi
    .string()
    .required()
    .external(checkUserNameNotExist)
    .trim()
    .messages(
      getCommonMessageValidate<ReqUserProfile>({
        field: 'username'
      })
    )
})
