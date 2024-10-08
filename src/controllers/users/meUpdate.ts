import { handleResponseSuccess } from '@/helpers/handler'
import { ReqMeUpdate } from '@/models/dto/users'
import { UserSchema } from '@/models/schemas/user'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'
import { ObjectId } from 'mongodb'

export const meUpdateController: Controller<ReqMeUpdate> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  const result = await userService.updateUserWithProjection({
    ...req.body,
    twitter_circle: req.body.twitter_circle?.map((id) => new ObjectId(id)),
    date_of_birth: req.body.date_of_birth ? new Date(req.body.date_of_birth) : userInfo.date_of_birth
  })

  return handleResponseSuccess<UserSchema | null>(res, {
    data: result
  })
}
