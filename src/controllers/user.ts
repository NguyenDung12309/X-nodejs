import { handleResponseSuccess } from '@/helpers/handler'
import { reqLogin, reqLogout, reqRegister, resToken } from '@/models/dto/register'
import { databaseService } from '@/services/db'
import { userService } from '@/services/user.js'
import { Controller } from '@/types/type.js'
import { DeleteResult } from 'mongodb'

export const registerController: Controller<reqRegister> = async (req, res) => {
  const result = await userService.createUser(req.body)

  return handleResponseSuccess<resToken>(res, { data: result })
}

export const loginController: Controller<reqLogin> = async (req, res) => {
  const userInfo = userService.userInfo

  if (!userInfo) return

  const userId = userInfo._id?.toString() as string
  const result = await userService.login(userId)

  return handleResponseSuccess<resToken>(res, { data: result })
}

export const logoutController: Controller<reqLogout> = async (req, res) => {
  const token = req.body.refresh_token.split(' ')[1]

  const result = await databaseService.refreshToken.deleteOne({ token })

  return handleResponseSuccess<DeleteResult>(res, { data: result })
}
