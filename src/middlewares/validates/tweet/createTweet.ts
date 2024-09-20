import { joi } from '@/helpers/joi'
import { ReqCreateTweet } from '@/models/dto/tweet/tweet'
import { TweetAudience, TweetType } from '@/types/type'
import { checkParentId } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'

export const createTweetValidate = joi.object<ReqCreateTweet>({
  type: joi
    .number()
    .valid(TweetType)
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'type'
      })
    ),
  audience: joi
    .number()
    .valid(TweetAudience)
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'audience'
      })
    ),
  parent_id: joi
    .string()
    .external(checkParentId)
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'parent_id'
      })
    )
})
