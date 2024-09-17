import { handleResponseSuccess } from '@/helpers/handler'
import { Media, ReqUploadImage } from '@/models/dto/media/uploadImage'
import { mediaService } from '@/services/media'
import { Controller } from '@/types/type'
import { Request } from 'express'

export const uploadImageController: Controller<ReqUploadImage> = async (req, res) => {
  const data = await mediaService.handleUploadImage(req as Request)

  return handleResponseSuccess<Media[]>(res, {
    data: {
      ...data
    }
  })
}
