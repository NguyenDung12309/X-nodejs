import { Controller } from '@/types/type.js'

export const loginController: Controller<any> = (req, res) => {
  res.json({
    data: [
      {
        message: 'login success'
      }
    ]
  })
}
