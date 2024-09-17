import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqUserProfile } from '@/models/dto/users/userProfile'

export const userProfileValidate = joi.object<ReqUserProfile>({
  username: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<ReqUserProfile>({
        field: 'username'
      })
    )
})
