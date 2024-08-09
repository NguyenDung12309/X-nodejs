import { handleResponseSuccess } from '@/helpers/handler'
import { reqUpdateProfile } from '@/models/dto/users/updateProfile'
import { UserSchema } from '@/models/schemas/user'
import { databaseService } from '@/services/db'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'
import { omit } from 'lodash'

export const updateProfileController: Controller<reqUpdateProfile> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  const result = await databaseService.users.findOneAndUpdate(
    {
      _id: userInfo?._id
    },
    {
      $set: {
        ...omit(req.body, ['password', 'email_verify_token', 'forgot_password_token']),
        date_of_birth: req.body.date_of_birth ? new Date(req.body.date_of_birth) : userInfo.date_of_birth
      },
      $currentDate: {
        updated_at: true
      }
    },
    {
      returnDocument: 'after',
      projection: {
        password: 0,
        email_verify_token: 0,
        forgot_password_token: 0
      }
    }
  )

  return handleResponseSuccess<UserSchema | null>(res, {
    data: result
  })
}
