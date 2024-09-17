import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqFollow } from '@/models/dto/follow/follow'
import { isFollow } from './custom'

export const followValidate = joi.object<ReqFollow>({
  followed_user_id: joi
    .string()
    .required()
    .trim()
    .external(isFollow)
    .messages(
      getCommonMessageValidate<ReqFollow>({
        field: 'followed_user_id'
      })
    )
})
