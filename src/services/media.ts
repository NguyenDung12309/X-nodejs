import { UPLOAD_DIR } from '@/constraints/path'
import { handleUploadSingleMedia } from '@/helpers/media'
import { Request } from 'express'
import sharp from 'sharp'
import 'dotenv/config'
import fs from 'fs'

class MediaService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleMedia(req)

    const fileName = file.newFilename.split('.')[0]

    sharp.cache(false)

    await sharp(file.filepath)
      .jpeg()
      .toFile(UPLOAD_DIR + '/' + fileName + '.jpg')

    fs.unlinkSync(file.filepath)

    return process.env.MEDIA_URL + '/' + fileName + '.jpg'
  }
}

export const mediaService = new MediaService()
