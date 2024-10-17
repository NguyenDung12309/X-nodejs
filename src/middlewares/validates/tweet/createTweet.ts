import { joi } from '@/helpers/joi'
import { TweetAudience, TweetType } from '@/types/type'
import { checkContent, checkParentId } from './custom'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqCreateTweet } from '@/models/dto/tweet/createTweet'

export const createTweetValidate = joi.object<ReqCreateTweet>({
  type: joi
    .number()
    .valid()
    .valid(TweetType.QuoteTweet)
    .valid(TweetType.Comment)
    .valid(TweetType.Retweet)
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'type',
        matchField: `${TweetType.QuoteTweet}, ${TweetType.Comment}, ${TweetType.Retweet}`
      })
    ),
  audience: joi
    .number()
    .valid(TweetAudience.Everyone)
    .valid(TweetAudience.TwitterCircle)
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'audience'
      })
    ),
  parent_id: joi
    .string()
    .allow(null)
    .external(checkParentId)
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'parent_id'
      })
    ),
  content: joi
    .string()
    .trim()
    .allow(null, '')
    .external(checkContent)
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'content'
      })
    ),
  hashtags: joi
    .array()
    .items(joi.string())
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'hashtags'
      })
    ),
  mentions: joi
    .array()
    .items(joi.string())
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'hashtags'
      })
    ),
  medias: joi
    .array()
    .items(joi.string())
    .messages(
      getCommonMessageValidate<ReqCreateTweet>({
        field: 'medias'
      })
    )
})
