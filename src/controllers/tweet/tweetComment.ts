import { handleResponseSuccess } from '@/helpers/handler'
import { ReqGetTweetChild, ResTweetChild } from '@/models/dto/tweet/getTweetChild'
import { tweetService } from '@/services/tweet'
import { Controller } from '@/types/type'

export const getTweetChildController: Controller<any, ReqGetTweetChild> = async (req, res) => {
  const tweet_type = +req.query.type
  const limit = +req.query.limit
  const page = +req.query.page

  const { tweets, total } = await tweetService.getTweetChild(req.query.parent_id, tweet_type, limit, page)

  return handleResponseSuccess<ResTweetChild>(res, {
    data: {
      tweets,
      pagination: {
        limit,
        page,
        total_page: Math.ceil(total / limit)
      }
    }
  })
}
