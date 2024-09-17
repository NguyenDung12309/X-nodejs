import { handleResponseSuccess } from '@/helpers/handler'
import { ReqUnFollow } from '@/models/dto/follow/unFollow'
import { FollowSchema } from '@/models/schemas/follow'
import { databaseService } from '@/services/db'
import { followService } from '@/services/follow'
import { Controller } from '@/types/type'

export const unFollowController: Controller<ReqUnFollow> = async (_, res) => {
  const documentFollower = followService.documentFollowerInfo as FollowSchema

  await databaseService.follow.deleteOne({
    _id: documentFollower._id
  })

  return handleResponseSuccess(res)
}
