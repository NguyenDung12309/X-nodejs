import { handleResponseSuccess } from '@/helpers/handler'
import { reqRegister } from '@/models/dto/auth/register'
import { resAuthToken } from '@/models/dto/token/token'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'

export const registerController: Controller<reqRegister> = async (req, res) => {
  const result = await userService.createUser(req.body)

  return handleResponseSuccess<resAuthToken>(res, {
    data: {
      access_token: result.accessToken,
      refresh_token: result.refreshToken
    }
  })
}
