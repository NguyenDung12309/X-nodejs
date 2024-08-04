import { handleResponseSuccess } from '@/helpers/handler'
import { reqVerifyForgotPasswordToken, resToken } from '@/models/dto/users/token'
import { Controller } from '@/types/type'

export const verifyForgotPasswordTokenController: Controller<reqVerifyForgotPasswordToken> = async (req, res) => {
  return handleResponseSuccess<resToken>(res)
}
