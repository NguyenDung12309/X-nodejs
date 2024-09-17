import { handleResponseSuccess } from '@/helpers/handler'
import { reqTweet } from '@/models/dto/tweet/tweet'
import { Controller } from '@/types/type'

export const tweetController: Controller<reqTweet> = async (req, res) => {
  return handleResponseSuccess<any>(res)
}
