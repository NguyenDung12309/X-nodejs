import { handleResponseSuccess } from '@/helpers/handler'
import { ReqCreateTweet } from '@/models/dto/tweet/createTweet'
import { Controller } from '@/types/type'

export const createTweetController: Controller<ReqCreateTweet> = async (_, res) => {
  return handleResponseSuccess<any>(res)
}
