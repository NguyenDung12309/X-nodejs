import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '@/constraints/path'
import { Request } from 'express'
import sharp from 'sharp'
import 'dotenv/config'
import fs from 'fs'
import { Media, MediaType } from '@/models/dto/media/uploadImage'
import { handleUploadImage, handleUploadVideo } from '@/helpers/media'

class MediaService {
  async handleUploadImage(req: Request) {
    const files = await handleUploadImage(req)

    const result = await Promise.all(
      files.map(async (file): Promise<Media> => {
        const fileName = file.newFilename.split('.')[0]

        sharp.cache(false)

        await sharp(file.filepath)
          .jpeg()
          .toFile(UPLOAD_IMAGE_DIR + '/' + fileName + '.jpg')

        fs.unlinkSync(file.filepath)

        return {
          url: process.env.MEDIA_IMAGE_URL + '/' + fileName + '.jpg',
          type: MediaType.Video
        }
      })
    )

    return result
  }

  async handleUploadVideo(req: Request) {
    const files = await handleUploadVideo(req)

    const result = await Promise.all(
      files.map(async (file): Promise<Media> => {
        const fileName = file.newFilename

        return {
          url: process.env.MEDIA_VIDEO_URL + '/' + fileName,
          type: MediaType.Video
        }
      })
    )

    return result
  }

  createUploadFolder() {
    if (!fs.existsSync(UPLOAD_IMAGE_DIR)) {
      fs.mkdirSync(UPLOAD_IMAGE_DIR)
    }

    if (!fs.existsSync(UPLOAD_VIDEO_DIR)) {
      fs.mkdirSync(UPLOAD_VIDEO_DIR)
    }

    if (!fs.existsSync(UPLOAD_VIDEO_TEMP_DIR)) {
      fs.mkdirSync(UPLOAD_VIDEO_TEMP_DIR)
    }

    if (!fs.existsSync(UPLOAD_IMAGE_TEMP_DIR)) {
      fs.mkdirSync(UPLOAD_IMAGE_TEMP_DIR)
    }
  }
}

export const mediaService = new MediaService()
