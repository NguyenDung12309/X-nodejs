import { handleResponseSuccess } from '@/helpers/handler'
import { Controller } from '@/types/type'

export const getTweetController: Controller<any> = async (_, res) => {
  return handleResponseSuccess(res)
}
