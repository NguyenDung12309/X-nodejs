import { handleResponseSuccess } from '@/helpers/handler'
import { Media } from '@/models/dto/media/uploadImage'
import { reqUploadVideo } from '@/models/dto/media/uploadVideo'
import { mediaService } from '@/services/media'
import { Controller } from '@/types/type'
import { Request } from 'express'

export const uploadVideoController: Controller<reqUploadVideo> = async (req, res) => {
  const data = await mediaService.handleUploadVideo(req as Request)

  handleResponseSuccess<Media[]>(res, {
    data: {
      ...data
    }
  })
}
