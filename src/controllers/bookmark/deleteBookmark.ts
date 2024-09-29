import { handleResponseSuccess } from '@/helpers/handler'
import { ReqDeleteBookmark } from '@/models/dto/bookmark/deleteBookmark'
import { bookmarkService } from '@/services/bookmark'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'
import { ObjectId } from 'mongodb'

export const deleteBookmarkController: Controller<any, ReqDeleteBookmark> = async (req, res) => {
  const userId = userService.userInfo?._id

  await bookmarkService.deleteBookmark(userId as ObjectId, req.query.tweet_id)

  return handleResponseSuccess(res)
}
