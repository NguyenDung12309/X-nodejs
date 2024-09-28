import { handleResponseSuccess } from '@/helpers/handler'
import { UserDto } from '@/models/dto/users'
import { ReqUserProfile } from '@/models/dto/users/userProfile'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'

export const userProfileController: Controller<any, ReqUserProfile> = async (_, res) => {
  return handleResponseSuccess<UserDto | null>(res, {
    data: userService.userInfo
  })
}
