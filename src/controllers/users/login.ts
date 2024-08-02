import { handleResponseSuccess } from '@/helpers/handler'
import { reqLogin } from '@/models/dto/users/login'
import { resToken } from '@/models/dto/users/token'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'

export const loginController: Controller<reqLogin> = async (req, res) => {
  const userInfo = userService.userInfo

  if (!userInfo) return

  const userId = userInfo._id?.toString() as string
  const result = await userService.getAccessAndRefreshToken(userId)

  return handleResponseSuccess<resToken>(res, { data: result })
}
