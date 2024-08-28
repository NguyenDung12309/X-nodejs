import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from '@/constraints/path'
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
