import { handleResponseSuccess } from '@/helpers/handler'
import { reqFollow } from '@/models/dto/follow/follow'
import { FollowSchema } from '@/models/schemas/follow'
import { UserSchema } from '@/models/schemas/user'
import { databaseService } from '@/services/db'
import { followService } from '@/services/follow'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'
import { ObjectId } from 'mongodb'

export const followController: Controller<reqFollow> = async (_, res) => {
  const userInfo = userService.userInfo as UserSchema

  await databaseService.follow.insertOne(
    new FollowSchema({
      user_id: new ObjectId(userInfo._id),
      followed_user_id: new ObjectId(followService.followerInfo?._id)
    })
  )

  return handleResponseSuccess(res)
}
