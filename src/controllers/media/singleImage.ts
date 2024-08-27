import { handleResponseSuccess } from '@/helpers/handler'
import { reqUploadSingleImage, resUploadSingleImage } from '@/models/dto/media/uploadSingleImage'
import { mediaService } from '@/services/media'
import { Controller } from '@/types/type'
import { Request } from 'express'

export const uploadSingleImageController: Controller<reqUploadSingleImage> = async (req, res) => {
  const data = await mediaService.handleUploadSingleImage(req as Request)

  handleResponseSuccess<resUploadSingleImage>(res, {
    data: {
      image_url: data
    }
  })
}
