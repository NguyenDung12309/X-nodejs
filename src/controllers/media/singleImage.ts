import { handleResponseSuccess } from '@/helpers/handler'
import { handleUploadSingleMedia } from '@/helpers/media'
import { Controller } from '@/types/type'

export const uploadSingleImageController: Controller<any> = async (req, res) => {
  await handleUploadSingleMedia(req)

  handleResponseSuccess(res)
}
