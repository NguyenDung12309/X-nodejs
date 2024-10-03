import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqGetTweet } from '@/models/dto/tweet/getTweet'
import { checkAudienceCircle } from './custom'

export const getTweetValidate = joi.object<ReqGetTweet>({
  tweet_id: joi
    .string()
    .required()
    .trim()
    .external(checkAudienceCircle)
    .messages(
      getCommonMessageValidate<ReqGetTweet>({
        field: 'tweet_id'
      })
    )
})
