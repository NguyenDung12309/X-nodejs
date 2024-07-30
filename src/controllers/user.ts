import { reqRegister } from '@/models/dto/register'
import { userService } from '@/services/user.js'
import { Controller } from '@/types/type.js'
import { __ } from 'i18n'

export const loginController: Controller<any> = (req, res) => {
  res.json({
    data: [
      {
        message: 'login success'
      }
    ]
  })
}

export const registerController: Controller<reqRegister> = async (req, res, next) => {
  try {
    // throw new Error('loi roi')
    const result = await userService.createUser(req.body)

    return res.status(201).json({ message: __('success'), ...result })
  } catch (error) {
    if (next) next(error)
  }
}
