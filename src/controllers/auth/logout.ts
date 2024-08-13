import { handleResponseSuccess } from '@/helpers/handler'
import { reqLogout } from '@/models/dto/users/logout'
import { databaseService } from '@/services/db'
import { tokenService } from '@/services/token'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'
import { DeleteResult } from 'mongodb'

export const logoutController: Controller<reqLogout> = async (req, res) => {
  const token = req.body.refresh_token

  const result = await databaseService.refreshToken.deleteOne({ token })

  userService.resetUserInfo()
  tokenService.resetRefreshToken()

  return handleResponseSuccess<DeleteResult>(res, { data: result })
}
