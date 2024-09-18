import { handleResponseSuccess } from '@/helpers/handler'
import { ReqCreateTweet } from '@/models/dto/tweet/tweet'
import { Controller } from '@/types/type'

export const tweetController: Controller<ReqCreateTweet> = async (_, res) => {
  return handleResponseSuccess<any>(res)
}
