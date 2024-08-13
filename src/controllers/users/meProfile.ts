import { handleResponseSuccess } from '@/helpers/handler'
import { reqMeProfile } from '@/models/dto/users/meProfile'
import { UserSchema } from '@/models/schemas/user'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'
import { omit } from 'lodash'

export const meProfileController: Controller<reqMeProfile> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  const result = await userService.updateUserWithProjection({
    ...omit(req.body, ['password', 'email_verify_token', 'forgot_password_token']),
    date_of_birth: req.body.date_of_birth ? new Date(req.body.date_of_birth) : userInfo.date_of_birth
  })

  return handleResponseSuccess<UserSchema | null>(res, {
    data: result
  })
}
