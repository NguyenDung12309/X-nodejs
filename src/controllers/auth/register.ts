import { handleResponseSuccess } from '@/helpers/handler'
import { ReqRegister } from '@/models/dto/auth/register'
import { ResAuthToken } from '@/models/dto/token/token'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'

export const registerController: Controller<ReqRegister> = async (req, res) => {
  const result = await userService.createUser(req.body)

  return handleResponseSuccess<ResAuthToken>(res, {
    data: {
      access_token: result.accessToken,
      refresh_token: result.refreshToken
    }
  })
}
