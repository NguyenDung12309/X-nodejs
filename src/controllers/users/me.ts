import { handleResponseSuccess } from '@/helpers/handler'
import { reqAuthorization } from '@/models/dto/token/token'
import { UserDto } from '@/models/dto/users/me'
import { UserSchema } from '@/models/schemas/user'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'

export const getMeController: Controller<reqAuthorization> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  return handleResponseSuccess<UserDto>(res, {
    data: userInfo
  })
}
