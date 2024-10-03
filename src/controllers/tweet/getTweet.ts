import { handleResponseSuccess } from '@/helpers/handler'
import { ReqGetTweet } from '@/models/dto/tweet/getTweet'
import { TweetSchema } from '@/models/schemas/tweet'
import { tweetService } from '@/services/tweet'
import { Controller } from '@/types/type'

export const getTweetController: Controller<ReqGetTweet> = async (_, res) => {
  const tweetInfo = tweetService.tweetInfo as TweetSchema

  return handleResponseSuccess<TweetSchema>(res, {
    data: tweetInfo
  })
}
