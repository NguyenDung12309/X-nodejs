import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { reqUserProfile } from '@/models/dto/users/userProfile'

export const userProfileValidate = joi.object<reqUserProfile>({
  username: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqUserProfile>({
        field: 'username'
      })
    )
})
