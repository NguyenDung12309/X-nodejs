import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { reqFollow } from '@/models/dto/follow/follow'
import { isFollow } from './custom'

export const followValidate = joi.object<reqFollow>({
  followed_user_id: joi
    .string()
    .required()
    .trim()
    .external(isFollow)
    .messages(
      getCommonMessageValidate<reqFollow>({
        field: 'followed_user_id'
      })
    )
})
