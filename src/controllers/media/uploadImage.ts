import { handleResponseSuccess } from '@/helpers/handler'
import { Media, reqUploadImage } from '@/models/dto/media/uploadImage'
import { mediaService } from '@/services/media'
import { Controller } from '@/types/type'
import { Request } from 'express'

export const uploadImageController: Controller<reqUploadImage> = async (req, res) => {
  const data = await mediaService.handleUploadImage(req as Request)

  handleResponseSuccess<Media[]>(res, {
    data: {
      ...data
    }
  })
}
