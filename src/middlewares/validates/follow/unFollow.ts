import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { isNotFollow } from './custom'
import { reqUnFollow } from '@/models/dto/follow/unFollow'

export const unFollowValidate = joi.object<reqUnFollow>({
  followed_user_id: joi
    .string()
    .required()
    .trim()
    .external(isNotFollow)
    .messages(
      getCommonMessageValidate<reqUnFollow>({
        field: 'followed_user_id'
      })
    )
})
