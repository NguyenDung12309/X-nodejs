import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { checkTweetExists } from './custom'
import { ReqDeleteBookmark } from '@/models/dto/bookmark/deleteBookmark'

export const deleteBookmarkValidate = joi.object<ReqDeleteBookmark>({
  tweet_id: joi
    .string()
    .required()
    .trim()
    .external(checkTweetExists)
    .messages(
      getCommonMessageValidate<ReqDeleteBookmark>({
        field: 'tweet_id'
      })
    )
})
