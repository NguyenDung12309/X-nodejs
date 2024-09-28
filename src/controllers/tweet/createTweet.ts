import { handleResponseSuccess } from '@/helpers/handler'
import { ReqCreateTweet } from '@/models/dto/tweet/createTweet'
import { tweetService } from '@/services/tweet'
import { Controller } from '@/types/type'
import { InsertOneResult } from 'mongodb'

export const createTweetController: Controller<ReqCreateTweet> = async (req, res) => {
  const result = await tweetService.createTweet(req.body)

  return handleResponseSuccess<InsertOneResult>(res, {
    data: result
  })
}
