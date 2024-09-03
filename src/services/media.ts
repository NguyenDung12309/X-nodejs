import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from '@/constraints/path'
import { Request } from 'express'
import sharp from 'sharp'
import 'dotenv/config'
import fs from 'fs'
import { handleUploadMedia } from '@/helpers/media'
import { Media, MediaType } from '@/models/dto/media/uploadImage'

class MediaService {
  async handleUploadImage(req: Request) {
    const files = await handleUploadMedia(req)

    const result = await Promise.all(
      files.map(async (file): Promise<Media> => {
        const fileName = file.newFilename.split('.')[0]

        sharp.cache(false)

        await sharp(file.filepath)
          .jpeg()
          .toFile(UPLOAD_DIR + '/' + fileName + '.jpg')

        fs.unlinkSync(file.filepath)

        return {
          url: process.env.MEDIA_URL + '/' + fileName + '.jpg',
          type: MediaType.Video
        }
      })
    )

    return result
  }

  createUploadFolder() {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR)
    }

    if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
      fs.mkdirSync(UPLOAD_TEMP_DIR)
    }
  }
}

export const mediaService = new MediaService()
