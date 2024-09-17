import { handleResponseSuccess } from '@/helpers/handler'
import { ReqAuthorization } from '@/models/dto/token/token'
import { UserDto } from '@/models/dto/users/me'
import { UserSchema } from '@/models/schemas/user'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'

export const getMeController: Controller<ReqAuthorization> = async (_, res) => {
  const userInfo = userService.userInfo as UserSchema

  return handleResponseSuccess<UserDto>(res, {
    data: userInfo
  })
}
