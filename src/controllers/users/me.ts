import { handleResponseSuccess } from '@/helpers/handler'
import { UserDto } from '@/models/dto/users/me'
import { reqAuthorization } from '@/models/dto/users/token'
import { UserSchema } from '@/models/schemas/user'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'
import { omit } from 'lodash'

export const getMeController: Controller<reqAuthorization> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  return handleResponseSuccess<UserDto>(res, {
    data: omit(userInfo, ['email_verify_token', 'password', 'forgot_password_token'])
  })
}
