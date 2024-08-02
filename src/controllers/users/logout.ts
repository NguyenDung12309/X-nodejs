import { handleResponseSuccess } from '@/helpers/handler'
import { reqLogout } from '@/models/dto/users/logout'
import { databaseService } from '@/services/db'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'
import { DeleteResult } from 'mongodb'

export const logoutController: Controller<reqLogout> = async (req, res) => {
  const token = req.body.refresh_token.split(' ')[1]

  const result = await databaseService.refreshToken.deleteOne({ token })

  userService.resetUserInfo()
  userService.resetRefreshToken()

  return handleResponseSuccess<DeleteResult>(res, { data: result })
}
