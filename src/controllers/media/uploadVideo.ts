import { handleResponseSuccess } from '@/helpers/handler'
import { ReqUploadVideo } from '@/models/dto/media/uploadVideo'
import { mediaService } from '@/services/media'
import { Controller, Media } from '@/types/type'
import { Request } from 'express'

export const uploadVideoController: Controller<ReqUploadVideo> = async (req, res) => {
  const data = await mediaService.handleUploadVideo(req as Request)

  return handleResponseSuccess<Media[]>(res, {
    data: {
      ...data
    }
  })
}
