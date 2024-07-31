import { useI18n } from '@/helpers/i18n'
import { reqLogin, reqRegister } from '@/models/dto/register'
import { userService } from '@/services/user.js'
import { Controller } from '@/types/type.js'

export const registerController: Controller<reqRegister> = async (req, res) => {
  const result = await userService.createUser(req.body)

  return res.status(201).json({ message: useI18n.__('success'), ...result })
}

export const loginController: Controller<reqLogin> = async (req, res) => {
  const userInfo = userService.userInfo
  const userId = userInfo._id?.toString() as string
  const { accessToken, refreshToken } = await userService.login(userId)

  return res.status(201).json({ message: useI18n.__('success'), accessToken, refreshToken })
}
