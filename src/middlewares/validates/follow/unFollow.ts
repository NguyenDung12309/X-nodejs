import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { isNotFollow } from './custom'
import { ReqUnFollow } from '@/models/dto/follow/unFollow'

export const unFollowValidate = joi.object<ReqUnFollow>({
  followed_user_id: joi
    .string()
    .required()
    .trim()
    .external(isNotFollow)
    .messages(
      getCommonMessageValidate<ReqUnFollow>({
        field: 'followed_user_id'
      })
    )
})
