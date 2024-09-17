import { sha256 } from '@/helpers/crypto'
import { handleResponseSuccess } from '@/helpers/handler'
import { ReqResetPassword } from '@/models/dto/auth/resetPassword'
import { userService } from '@/services/user'
import { Controller } from '@/types/type'

export const resetPasswordController: Controller<ReqResetPassword> = async (req, res) => {
  await userService.updateUser({
    password: sha256(req.body.password)
  })

  return handleResponseSuccess(res)
}
