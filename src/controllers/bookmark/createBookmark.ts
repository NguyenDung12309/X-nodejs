import { handleResponseSuccess } from '@/helpers/handler'
import { ReqCreateBookmark } from '@/models/dto/bookmark/createBookmark'
import { bookmarkService } from '@/services/bookmark'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'
import { ObjectId } from 'mongodb'

export const createBookmarkController: Controller<ReqCreateBookmark> = async (req, res) => {
  const userId = userService.userInfo?._id

  await bookmarkService.createBookmark(userId as ObjectId, req.body.tweet_id)

  return handleResponseSuccess(res)
}
