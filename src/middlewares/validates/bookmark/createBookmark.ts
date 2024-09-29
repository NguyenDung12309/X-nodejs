import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqCreateBookmark } from '@/models/dto/bookmark/createBookmark'
import { checkTweetExists } from './custom'

export const createBookmarkValidate = joi.object<ReqCreateBookmark>({
  tweet_id: joi
    .string()
    .required()
    .trim()
    .external(checkTweetExists)
    .messages(
      getCommonMessageValidate<ReqCreateBookmark>({
        field: 'tweet_id'
      })
    )
})
