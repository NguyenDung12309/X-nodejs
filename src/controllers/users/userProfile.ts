import { handleResponseSuccess } from '@/helpers/handler'
import { UserDto } from '@/models/dto/users'
import { reqUserProfile } from '@/models/dto/users/userProfile'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'

export const userProfileController: Controller<any, reqUserProfile> = async (req, res) => {
  const query = req.query

  await userService.findUser({ username: query.username })

  return handleResponseSuccess<UserDto | null>(res, {
    data: userService.userInfo
  })
}
