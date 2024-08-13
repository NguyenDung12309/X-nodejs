import { handleResponseSuccess } from '@/helpers/handler'
import { resToken } from '@/models/dto/token/token'
import { reqLogin } from '@/models/dto/users/login'
import { UserSchema } from '@/models/schemas/user'
import { tokenService } from '@/services/token'
import { userService } from '@/services/user'
import { Controller, UserVerifyStatus } from '@/types/type'
import { ObjectId } from 'mongodb'

export const loginController: Controller<reqLogin> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  const result = await tokenService.createAccessAndRefreshToken({
    user_id: userInfo._id as ObjectId,
    verify: userInfo.verify as UserVerifyStatus
  })

  return handleResponseSuccess<resToken>(res, {
    data: {
      access_token: result.accessToken,
      refresh_token: result.refreshToken
    }
  })
}
