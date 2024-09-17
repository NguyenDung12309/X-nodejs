import { handleResponseSuccess } from '@/helpers/handler'
import { ReqLogin } from '@/models/dto/auth/login'
import { ResAuthToken } from '@/models/dto/token/token'
import { UserSchema } from '@/models/schemas/user'
import { tokenService } from '@/services/token'
import { userService } from '@/services/user'
import { Controller, UserVerifyStatus } from '@/types/type'
import { ObjectId } from 'mongodb'

export const loginController: Controller<ReqLogin> = async (_, res) => {
  const userInfo = userService.userInfo as UserSchema

  const result = await tokenService.createAccessAndRefreshToken({
    user_id: userInfo._id as ObjectId,
    verify: userInfo.verify as UserVerifyStatus
  })

  return handleResponseSuccess<ResAuthToken>(res, {
    data: {
      access_token: result.accessToken,
      refresh_token: result.refreshToken
    }
  })
}
